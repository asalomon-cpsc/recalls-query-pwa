# Overview

The Recall Retrieval Web Services are part of the CPSC Recall Database project.  The services are implemented as REST
web services and provide access to the Recall Central database.

The Recall Retrieval Web Services are co‐located with the saferproducts.gov public website, so that retrieval is
available to the general public. The root URI is [](https://www.saferproducts.gov/RestWebServices/Recall)
This document contains a description of available parameters, instructions on how to construct the URL to get the
desired resulting data set and sample code for processing the resulting data set.
Available Recall Retrieval Search Parameters
The Recall retrieval web services perform a case insensitive search for any or all of the following fields using a wildcard
search.
Data is returned as XML, or optionally as JSON:

```json
{
	"RecallID": "",
	"RecallNumber": "",
	"RecallDateStart": "",
	"RecallDateEnd": "",
	"LastPublishDateStart": "",
	"LastPublishDateEnd": "",
	"RecallURL": "",
	"RecallTitle": "",
	"ConsumerContact": "",
	"RecallDescription": "",
	"ProductName": "",
	"ProductDescription": "",
	"ProductModel": "",
	"ProductType": "",
	"InconjunctionURL": "",
	"ImageURL": "",
	"Injury": "",
	"Manufacturer": "",
	"Retailer": "",
	"Importer": "",
	"Distributor": "",
	"ManufacturerCountry": "",
	"UPC": "",
	"Hazard": "",
	"Remedy": "",
	"RemedyOption": ""
}
```
## Json example:

```javascript
[{
    RecallID: 8267,
    RecallNumber: 18110,
    RecallDate: "2018-03-01T00:00:00",
    Description: "This recall involves Gem 65 8-in-1 model multicookers, a multifunctional, programmable cooking appliance, which includes the functions of roasting, baking, stewing, slow cooking, rice cooking, searing/sautéing, steaming and food warming. Instant Pot is printed on the front of the multicookers. Gem 65 8-in-1 and a batchcode of 1728, 1730, 1731, 1734 or 1746 are printed on the rating label on the underside of the product.",
    URL: "https://www.cpsc.gov/Recalls/2018/Double-Insight-Recalls-Multicookers-Due-to-Fire-Hazard-Sold-Exclusively-at-Walmart",
    Title: "Double Insight Recalls Multicookers Due to Fire Hazard; Sold Exclusively at Walmart",
    ConsumerContact: "Double Insight toll-free at 888-891-1473 from 8:30 a.m. to 10 p.m. ET Monday through Friday and from 10 a.m. to 6 p.m. ET Saturday and Sunday or online at www.instantpot.com and click on “Product Recall” or visit www.gemmulticooker.com for more information.",
    LastPublishDate: "2018-03-01T00:00:00",
    Products: [{
      Name: "Gem 65 8-in-1 multicookers",
      Description:"" ,
      Model: "",
      Type: "",
      CategoryID: "",
      NumberOfUnits: "About 104,000"
    }],
    Inconjunctions: [],
    Images: [{
      URL: "https://www.cpsc.gov/s3fs-public/884_1.jpeg"
    }, {
      URL: "https://www.cpsc.gov/s3fs-public/884_2.jpeg"
    }],
    Injuries: [{
      Name: "Double Insight has received 107 reports of overheating, five resulting in minor property damage. No injuries have been reported."
    }],
    Manufacturers: [{
      Name: "Foshan Linshine Technology Co., Guangdong, China",
      CompanyID: ""
    }],
    ManufacturerCountries: [{
      Country: "China"
    }],
    ProductUPCs: [],
    Hazards: [{
      Name:"A manufacturer defect can cause the multicooker to overheat and melt on the underside, posing a fire hazard.",
      HazardTypeID: ""
    }],
    Remedies: [{
      Name: "Consumers should immediately stop using the recalled multicookers, unplug the unit and return it to Walmart to receive a free replacement."
    }],
    Retailers: [{
      Name: "Walmart stores nationwide and online at www.walmart.com from August 2017 through January 2018 for about $80.",
      CompanyID: ""
    }]
  }]
```

## XML example:

```XML
This XML file does not appear to have any style information associated with it. The document tree is shown below.
<Recalls xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<Recall>
<RecallID>8308</RecallID>
<RecallNumber>18143</RecallNumber>
<RecallDate>2018-04-19</RecallDate>
<Description>
This recall involves Petit Collage musical jumbo wooden xylophones. They are musical instrument toys for children. The recalled toy xylophone has a wooden base shaped like the profile of an elephant with five different colored metal keys and a wooden beater stick with a red wooden ball attached to one end. The beater stick measures about 5 5/8 inches long by 3/4 inches wide. “Petit Collage” and “TT.1902.0617” are printed on the bottom back of the xylophone. Only xylophones with this letter/number combination are included in the recall.
</Description>
<URL>
https://www.cpsc.gov/Recalls/2018/Wild--Wolf-Recalls-Petit-Collage-Childrens-Toy-Xylophones-Due-to-Choking-Hazard
</URL>
<Title>
Wild & Wolf Recalls Petit Collage Children’s Toy Xylophones Due to Choking Hazard
</Title>
<ConsumerContact>
Wild & Wolf toll free at 855-215-5879 from 8 a.m. to 5 p.m. ET Monday through Friday or online at www.petitcollage.com and click on “Product Safety” or www.wildandwolf.com and click on “Product Safety News” for more information.
</ConsumerContact>
<LastPublishDate>2018-04-19</LastPublishDate>
<Products>
<Product>
<Name>Petit Collage musical jumbo wooden xylophones</Name>
<Description/>
<Model/>
<Type/>
<CategoryID/>
<NumberOfUnits>
About 2,900 (In addition, about 240 were sold in Canada)
</NumberOfUnits>
</Product>
</Products>
<Inconjunctions>
<Inconjunction>
<URL>
http://healthycanadians.gc.ca/recall-alert-rappel-avis/hc-sc/2018/66524r-eng.php
</URL>
</Inconjunction>
</Inconjunctions>
<Images>
<Image>
<URL>https://www.cpsc.gov/s3fs-public/955_1.jpeg</URL>
</Image>
<Image>
<URL>https://www.cpsc.gov/s3fs-public/955_2.jpeg</URL>
</Image>
<Image>
<URL>https://www.cpsc.gov/s3fs-public/955_3.jpeg</URL>
</Image>
</Images>
<Injuries>
<Injury>
<Name>
The firm has received one report of the ball separating from the beater rod and one report of the ball being loose. No injuries have been reported.
</Name>
</Injury>
</Injuries>
<Manufacturers>
<RecallFirm>
<Name>Ningbo Tooky Toy Co. Ltd, of China</Name>
<CompanyID/>
</RecallFirm>
</Manufacturers>
<Retailers>
<RecallFirm>
<Name>
Barnes & Noble, Patina, Urban Outfitters stores and other stores nationwide and online at PetitCollage.com and other websites from August 2017 through February 2018 for about $24.
</Name>
<CompanyID/>
</RecallFirm>
</Retailers>
<Importers>
<RecallFirm>
<Name>Petit Collage, of San Francisco, Calif.</Name>
<CompanyID/>
</RecallFirm>
</Importers>
<Distributors>
<RecallFirm>
<Name>Wild & Wolf, of U.K.</Name>
<CompanyID/>
</RecallFirm>
</Distributors>
<ManufacturerCountries>
<ManufacturerCountry>
<Country>China</Country>
</ManufacturerCountry>
</ManufacturerCountries>
<ProductUPCs/>
<Hazards>
<Hazard>
<Name>
The ball on the end of the toy xylophone beater stick can separate, posing a choking hazard to young children.
</Name>
<HazardType/>
<HazardTypeID/>
</Hazard>
</Hazards>
<Remedies>
<Remedy>
<Name>
Consumers should immediately take the recalled toy xylophone beater sticks away from children, stop using them and contact Wild & Wolf for a free replacement beater stick.
</Name>
</Remedy>
</Remedies>
<RemedyOptions>
<RemedyOption>
<Option>Replace</Option>
</RemedyOption>
</RemedyOptions>
</Recall>
</Recalls>
```

In addition, a non‐field parameter is available:
format: determines the output format.  Possible values are XML or JSON.  The default value is XML .
Desired search parameters are to be appended to the root URI in the form of HTML query strings, as in the following
example, which is an URI to retrieve recalls such that the title contains the string "child" and the description contains the
string "metal":
[](https://www.saferproducts.gov/RestWebServices/Recall?RecallTitle=child&RecallDescription=metal)
Note that neither "child" nor "metal" need be an actual word in the respective fields. For instance, a recall had the
proper noun Fairchild in the title and the qualifier non‐metallic in the description would be a match for the above
request.
The following URI will retrieve the same result set as above in Json format:



# Javascript Example Code

JavaScript Example Code to Access the Recall Retrieval Web Services
The code excerpt below demonstrates accessing the Recall Retrieval Web Services using JavaScript, with the inclusion of
jQuery (e.g., jquery‐1.7.1.min.js). It could be part of a web page, where the operators could input values from some of
the various search parameters above, for instance (as in the above example) a  search pattern of "stroller" for title and
"pinch" for hazard:

```javascript
var titlePatt = ''; //search pattern for Recall Title
var hazardPatt = ''; //search pattern for Hazard
//before calling SearchRecalls() other code would fill the variables above with the respective search patterns
 function SearchRecalls() {
    var restURI = "https://www.saferproducts.gov/RestWebServices/";
    restURI += "/Recall?RecallTitle=" + titlePatt + "&Hazard=" + hazardPatt
    restURI += "&format=json";
    $.ajax({
    url: restURI, type: 'GET', datatype: 'json',
    error: function (jqXHR, textStatus, errorThrown) {
     var whatError = errorThrown; alert(whatError);
    },
    success: function (recCollection) {
     if (recCollection != null) {
      if (recCollection.length > 0) {
       // display the first recall of the collection in a div with id='displayDiv'
       var displayText = 'Recall ID = ' + recCollection[0].RecallID;
       displayText += '<br />Recall Number = ' + recCollection[0].RecallNumber;
       displayText += '<br />Recall Title = ' + recCollection[0].Title;
       displayText += '<br />Recall URL = ' + recCollection[0].URL;
       //and so on ...
       $('#displayDiv').html(displayText);
      }
     }
    }
    });
}
```

## Csharp (C#) Example Code:
```csharp
public class Recall {
public int RecallID { get; set; }
public string RecallNumber { get; set; }
public DateTime? RecallDate { get; set; }
public string Description { get; set; }
public string URL { get; set; }
public string Title { get; set; }
public string ConsumerContact { get; set; }
public DateTime? LastPublishDate { get; set; }
public List<Product> Products { get; set; }
public List<InConjunction> Inconjunctions { get; set; }
public List<Image> Images { get; set; }
public List<Injury> Injuries { get; set; }
public List<RecallFirm> Manufacturers { get; set; }
public List<RecallFirm> Retailers { get; set; }
public List<RecallFirm> Importers { get; set; }
public List<RecallFirm> Distributors { get; set; }
public List<ManufacturerCountry> ManufacturerCountries { get; set; }
public List<ProductUPC> ProductUPCs { get; set; }
public List<Hazard> Hazards { get; set; }
public List<Remedy> Remedies { get; set; }
public List<RemedyOption> RemedyOptions { get; set; }
}
public class Product {
public string Name { get; set; }
public string Description { get; set; }
public string Model { get; set; }
public string Type { get; set; }
public string CategoryID { get; set; }
public string NumberOfUnits { get; set; }
}
public class InConjunction {
public string URL { get; set; }
}
public class Image {
public string URL { get; set; }
}
public class Injury {
public string Name { get; set; }
}
public class RecallFirm {
public string Name { get; set; }
public string CompanyID { get; set; }
}
public class ManufacturerCountry {
public string Country { get; set; }
}
public class ProductUPC {
public string UPC { get; set; }
}
public class Hazard {
public string Name { get; set; }
public string HazardType { get; set; }
public string HazardTypeID { get; set; }
}
public class Remedy {
public string Name { get; set; }
}
public class RemedyOption {
public string Option { get; set; }
}
```

The following code fragment illustrates a method that will retrieve all recalls up to a certain date, and choices of wild
card matches for Recall Number (e.g. "1103" would match FY11 recalls with recall number between, 11‐030 and 11‐039,
as well as recalls 01‐103, 01‐103, and 81‐103, if they exist), Product Name and Firm Name (either manufacturer, retailer,
importer or distributor):

```csharp
// needed for WebClient, StringBuilder and JavaScriptSerializer
using System.Net;
using System.Text;
using System.Web.Script.Serialization;
const string SERVICE_ROOT = " https://www.saferproducts.gov/RestWebServices/Recall";

public static StringBuilder AppendParam(StringBuilder uriBuilder, string format, string param){
    return !String.IsNullOrEmpty(param)
            ?uriBuilder.AppendFormat(format, param)
            :uriBuilder;
}
public static List<Recall> GetRecall(string recallNumber, DateTime recallDateEnd, string productName,
string firmName) {
StringBuilder uriBuilder = new StringBuilder(SERVICE_ROOT);
// definitely want JSON
uriBuilder.Append("?format=json");
IDictionary uriParamFormats = new Dictionary<string,string>() {
      { "&RecallNumber={0}", recallNumber },
      { "&DateEnd={0:yyyy‐MM‐dd}", recallEndDate },
      { "&RecallFirm={0}", recallFirm }
    };
foreach (var uriParamFormat in uriParamFormats)
{
    uriBuilder= AppendParam(uriBuilder,uriParamFormat.key,uriParamFormat.Value);
}

// of course, other elements would possible, for instance,
// if (!String.IsNullOrEmpty(lastPublishDateStart)) {
// uriBuilder.AppendFormat("&LastPublishDateStart={0}", lastPublishDateStart);
// }
// and so on...
List<Recall> recList = null;
using (WebClient getClient = new WebClient()) {
    try {
    // ensure desired encoding is used
    getClient.Encoding = Encoding.UTF8;
    string jsonResult = getClient.DownloadString(uriBuilder.ToString());
    JavaScriptSerializer javaSer = new JavaScriptSerializer();
    javaSer.MaxJsonLength = jsonResult.Length;
    recList = javaSer.Deserialize<List<Recall>>(jsonResult);
    }
    catch (Exception ex) {
    string errorMessage = ex.Message;
    }
}
return recList;
}
```