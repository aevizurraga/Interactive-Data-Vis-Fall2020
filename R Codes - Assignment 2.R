library(dplyr)
install.packages("scales")
library(scales)
install.packages("stringr")
library(stringr)
co_set <- read.csv("Complete_Settlements_1.csv", na.strings = "")

#Rename variables to remove all caps

co_set_renamed <- rename(co_set,  Filed.Date = FILED.DATE, Agency = AGENCY, Fiscal.Year = FISCAL.YEAR..FY., Claim.Action = CLAIM.ACTION, Settlement.Amount = DISPOSITION.AMOUNT, Borough = BOROUGH, Claim.Type = CLAIM.TYPE)

#Select variables that will be used

co_set_selected<- co_set_renamed %>%
  select(Borough, Filed.Date, Settlement.Amount, Agency, Claim.Action, Fiscal.Year, Claim.Type)

#Select settled only cases

settled_claims <- co_set_selected %>%
  filter(Claim.Action == "SETTLED")

#Select police cases and rename "POLICE DEPARTMENT" category to remove all caps

police_settled_claims <- settled_claims %>%
  filter(Agency %in% c("POLICE DEPARTMENT", "Police Department")) %>%
  mutate(Agency= recode(Agency, "POLICE DEPARTMENT" = "Police Department"))

#Remove variables and transform "Settlement.Amount" 

police_settled_claims_final <- police_settled_claims %>% 
  select(Borough, Filed.Date, Settlement.Amount, Fiscal.Year, Claim.Type) 
  #%>%
  #mutate(Settlement = number(Settlement.Amount, big.mark = ",", accuracy = .01, prefix = "$ "))

police_settled_claims_final_1 <- police_settled_claims_final %>%
  select(Borough, Filed.Date, Fiscal.Year, Claim.Type, Settlement.Amount)

#Transform "Borough" and "Claim.Type" to remove all caps. 

police_settled_claims_final_1$Claim.Type = str_to_title(police_settled_claims_final_1$Claim.Type)
police_settled_claims_final_1$Borough = str_to_title(police_settled_claims_final_1$Borough)

#Transform Year variables to only include year

police_settled_claims_final_1$Year.Filed = substring(police_settled_claims_final_1$Filed.Date, 7, 10)
police_settled_claims_final_1$Year.Settled = police_settled_claims_final_1$Fiscal.Year

#Select transformed variables

final_claims_assignment_2 <- police_settled_claims_final_1 %>%
  select(Borough, Year.Filed, Year.Settled, Claim.Type, Settlement.Amount)

#2018 Cases Only
final_claims_2018 <- police_settled_claims_final %>%
  filter(Fiscal.Year == "2018")

final_claims_2017 <- police_settled_claims_final %>%
  filter(Fiscal.Year == "2017")

final_claims_2016 <- police_settled_claims_final %>%
  filter(Fiscal.Year == "2016")

#Replace NA's with "Borough Missing"

final_claims_assignment_2$Borough <- str_replace_na(final_claims_assignment_2$Borough, replacement = "** Borough Missing **")
final_claims_assignment_2$Borough = str_to_title(final_claims_assignment_2$Borough)

#Save csv file
write.csv(final_claims_assignment_2, "Police_Settlements_1.csv", row.names = F)

####################################################################################################
final_claims_assignment_2$Settlement_Num <= gsub(",","", final_claims_assignment_2$Settlement)
