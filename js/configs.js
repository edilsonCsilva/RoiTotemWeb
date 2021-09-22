function Api(){
    return {
        "url":"https://api-roi.stilldistribuidora.com.br/",
        "username":"perola",
        "password":"123456",
        "companyName":"SUPERMERCADOS PÉROLA",
        "companysadress":"Rua Inácio Monteiro, 8404  \nbairro: Jardim São Paulo(Zona Leste)",
        "cnpj":"cnpj : 12.877.125/0001-83",
        "ie":  "ie: 017.024.334.838",
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