var projects = new Vue({
    el: "#projects",
    data: {
        'projects': [
            {
                'title': "SHOPLINE",
                'date': "2017 mid to 2017 late",
                'environment': "iOS 9 and above",
                'platform': "iPhone",
                'intro': "",
                'logo': "./images/appicons/icon-shopline.png",
                'screenshots': [
                    {
                        'url': "",
                        'description': ""
                    }
                ]
            },
            {
                'title': "SHOPLINE POS",
                'date': "2017 early to 2017 mid",
                'environment': "iOS 9 and above",
                'platform': "iPad",
                'intro': "",
                'logo': "./images/appicons/icon-shoplinepos.png",
                'screenshots': []
            },
            {
                'title': "PokeTAXI - Customer",
                'date': "2016 mid to 2016 late",
                'environment': "iOS 9 and above",
                'platform': "iPhone",
                'intro': "",
                'logo': "./images/appicons/icon-poketaxi.png",
                'screenshots': []
            },
            {
                'title': "PokeTAXI - Driver",
                'date': "2016 mid to 2016 late",
                'environment': "iOS 9 and above",
                'platform': "iPhone",
                'intro': "",
                'logo': "./images/appicons/icon-pokedriver.png",
                'screenshots': []
            },
            {
                'title': "inLine",
                'date': "2016 mid to 2016 late",
                'environment': "iOS 7 and above",
                'platform': "iPhone",
                'intro': "",
                'logo': "./images/appicons/icon-inline.jpg",
                'screenshots': []
            },
            {
                'title': "Paktor",
                'date': "2015 late to 2016 mid",
                'environment': "iOS 7 and above",
                'platform': "iPhone",
                'intro': "",
                'logo': "./images/appicons/icon-paktor.png",
                'screenshots': []
            },
            {
                'title': "Travelstart",
                'date': "2014 late to 2015 late",
                'environment': "iOS 7 and above",
                'platform': "iPhone",
                'intro': "",
                'logo': "./images/appicons/icon-travelstart.png",
                'screenshots': []
            },
            {
                'title': "Jink",
                'date': "2013 late to 2014 late",
                'environment': "iOS 6 and above",
                'platform': "iPhone",
                'intro': "",
                'logo': "./images/appicons/icon-jink.png",
                'screenshots': []
            },
            {
                'title': "Clearpath",
                'date': "2011 to 2012",
                'environment': "iOS",
                'platform': "iPad",
                'intro': "",
                'logo': "./images/appicons/icon-clearpath.png",
                'screenshots': []
            }
        ]
    },
    created: function () {
        var updateWindow = function() {
            var width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
    
            var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
            let scale = width / height;
            let screenHeight;
            let screenWidth;
            if (scale > 1.4515) {
                screenHeight = height;
                screenWidth = height * 1.4515;
            } else {
                screenHeight = width / 1.4515;
                screenWidth = width;
            }
            let leftOffset = (width - screenWidth) / 2.0;
            let topOffset = (height - screenHeight) / 2.0;
            let topEdgeOffset = screenHeight * 0.026444;
            let bottomEdgeOffset = screenHeight * 0.026444;
            let leftEdgeOffset = screenWidth * 0.1293;
            let rightEdgeOffset = screenWidth * 0.1717;
            let innerScreenHeight = screenHeight - topEdgeOffset - bottomEdgeOffset;  
            let innerScreenWidth = screenWidth - leftEdgeOffset - rightEdgeOffset;
            
            document.getElementById("ipad-screen").style.left = (leftOffset + leftEdgeOffset) + "px";
            document.getElementById("ipad-screen").style.top = (topOffset + topEdgeOffset) + "px";
            document.getElementById("ipad-screen").style.width = innerScreenWidth + "px";
            document.getElementById("ipad-screen").style.height = innerScreenHeight + "px";
        }
        window.onresize = function() {
            updateWindow();
        }
        updateWindow();
    },
})