library(dplyr)

#Insert CSV File
all_police_set <- read.csv(file ="policeSettlements.csv")

#Separate data by Borough - May be needed
bronx_only <- all_police_set %>%
  filter(Borough == "Bronx")
bk_only <- all_police_set %>%
  filter(Borough == "Brooklyn (Kings)")
queens_only <- all_police_set %>%
  filter(Borough == "Queens")
man_only <- all_police_set %>%
  filter(Borough == "Manhattan (New York)")
si_only <- all_police_set %>%
  filter(Borough == "Staten Island (Richmond)")

#Summarize Data grouped by Boroughs
allSummary <- all_police_set %>%
  group_by(Borough) %>%
  summarize(Average = mean(Settlement.Amount), Std.Dev = sd(Settlement.Amount), Minimum = min(Settlement.Amount), Maximum = max(Settlement.Amount), Count = n(), Sum = sum(Settlement.Amount))

#Turn tribble to dataframe
allSummary <- as.data.frame(allSummary) 

#Select only the 5 Boroughs
FiveBoroughsSummary <- allSummary %>%
  filter(Borough %in% c("Bronx", "Brooklyn (Kings)", "Queens", "Manhattan (New York)", "Staten Island (Richmond)"))

#Create population variable
Population <- c(1418207, 2559903, 1628706, 2253858, 476143)

#Insert population variable into main df
FiveBoroughsSummary$Population.2019.Estimate <- Population

#Create avg number of settlements per year variable
FiveBoroughsSummary$Avg.Set.Per.Year <- round((FiveBoroughsSummary$Count/3), 0)

#Create avg number of settlements per 10,000 people in each borough
FiveBoroughsSummary$Set.Per.10000.People <- round(((FiveBoroughsSummary$Avg.Set.Per.Year/FiveBoroughsSummary$Population.2019.Estimate) * 10000), 1)

write.csv(FiveBoroughsSummary, "NYC_Settlements_Table.csv", row.names = F)
