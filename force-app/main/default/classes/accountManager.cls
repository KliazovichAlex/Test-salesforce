public with sharing class accountManager {
    public accountManager() {

    }
    
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(String actType){
        String accountsType = '%'+actType+'%';
        return [SELECT Id, Name, Owner.Name, Type, Budget__c, Number_of_Employees__c FROM Account WHERE Type LIKE:accountsType];
    }

    @AuraEnabled(cacheable = true)
    public static List<AggregateResult> getBudgetSum(String actType){
        String accountsType = '%'+actType+'%';
        return [SELECT SUM(Budget__c) FROM Account WHERE Type LIKE:accountsType];
    }

}