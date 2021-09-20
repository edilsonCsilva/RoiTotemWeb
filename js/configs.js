function Api(){
    return {
        "url":"https://api-roi.stilldistribuidora.com.br/",
        "username":"perola",
        "password":"123456",
        "companyName":"Supermercado Peróla",
        "companysadress":"company's adress",
        "cnpj":"CNPJ : 29.021.114/0001-08",
        "ie":  " IE  : 017.024.334.838",
        "routes":{
            "oauth":'totem/login',
            "totemcampaigns":'totem/campaigns',
            "totemcustomers":'totem/customers',
            "totemcampaignscustomer":'totem/campaigns/customer',
            "publiczipcodes":"public/zipcodes",
            "totemcustomersstore":"totem/customers/store",
            "printcupom":"printcupom",
            "totemstoresinfo":"totem/stores/info",
            "totemcorporationscontract":"totem/corporations/contract",
            "publiczipcodessearchaddress":"public/zipcodes/search?address"
        
        }
        

    };
}