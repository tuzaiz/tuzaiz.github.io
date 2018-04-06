var route = new Vue({
    el: "#route",
    data: {
        "companies": [
            {
                'name': "Cloud Interactive",
                'logo': "./images/companylogos/logo-ci.svg",
                'darklogo': false,
                'website': "",
                'intro': ""
            },
            {
                'name': "Mercue",
                'logo': "./images/companylogos/logo-mercue.png",
                'darklogo': true,
                'website': "",
                'intro': ""
            },
            {
                'name': "Greenhouse",
                'logo': "./images/companylogos/logo-jink.png",
                'darklogo': true,
                'website': "",
                'intro': ""
            },
            {
                'name': "Travelstart",
                'logo': "./images/companylogos/logo-travelstart.svg",
                'darklogo': true,
                'website': "",
                'intro': ""
            },
            {
                'name': "Paktor",
                'logo': "./images/companylogos/logo-paktor.png",
                'darklogo': false,
                'website': "",
                'intro': ""
            },
            {
                'name': "Roam & Wander",
                'logo': "./images/companylogos/logo-rw.png",
                'darklogo': false,
                'website': "",
                'intro': ""
            },
            {
                'name': "SHOPLINE",
                'logo': "./images/companylogos/logo-shopline.png",
                'darklogo': false,
                'website': "",
                'intro': ""
            },
            {
                'name': "Gogolook",
                'logo': "./images/companylogos/logo-whoscall.png",
                'darklogo': true,
                'website': "",
                'intro': ""
            }
        ].reverse()
    },
    methods: {
        companyClassName: function(index) {
            if (index % 2 == 0) {
                return "company-even";
            } else {
                return "company-odd";
            }
        },
        bubbleClassName: function(company) {
            if (company.darklogo) {
                return "bubble";
            } else {
                return "bubble-dark";
            }
        }
    }
})