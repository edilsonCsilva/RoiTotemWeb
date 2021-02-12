function Api(){
    return {
        "url":"https://api-roi.stilldistribuidora.com.br/",
        "username":"user2",
        "password":"user2",
        "routes":{
            "oauth":'totem/login',
            "totemcampaigns":'totem/campaigns',
            "totemcustomers":'totem/customers',
            "totemcampaignscustomer":'totem/campaigns/customer',
            "publiczipcodes":"public/zipcodes",
            "totemcustomersstore":"totem/customers/store"
        
        }
        

    };
}