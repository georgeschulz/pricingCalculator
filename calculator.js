//initial variables
let priceRaisePercent = 2;
let proposedServices = [];
let proposedServiceTable = undefined;
let today = new Date();
const daysAgo = (days) => { return new Date(new Date().setDate(new Date().getDate()-days)) }
let hrefCode = undefined;
const large = 2500;
const medium = 1500;
const small = 0;
const tagColors = {};
let kill = false;


let head = `
<tr class="tableHeader">
    <th style="width: 2%"> </th>
    <th style="width: 6%">Obj Name</th>
    <th style="width: 12%">Service Name</th>
    <th style="width: 8%">Setup Fee</th>
    <th style="width: 8%">Per Service Fee</th>
    <th style="width: 6%">Freq</th>
    <th style="width: 10%">Proposal Value</th>
    <th style="width: 25%">Program Features</th>
    <th style="width: 35%">Tags</th>
</tr>`

let table = head;

class Feature {
  constructor(type, value, doesInclude) {
    this.type = type;
    this.value = value;
    this.doesInclude = doesInclude;
  }
  changeValue(newValue) {
    return {
      value: newValue,
      type: this.type
    }
  }
}


class Service {
  constructor(name) {
    this.name = name;
  }
  setPrice(setup,perServiceFee) {
    this.setupFee = globalPriceRaise(setup);
    this.perServiceFee = globalPriceRaise(perServiceFee);
    this.propsalValue = this.setupFee + (this.perServiceFee * this.freq)
    return this;
  }
  featureList() {
    let returnedList = '<ul class="ServiceFeatureList">';
    this.features.forEach((feature) => {
      returnedList += `<li class="serviceFeatureBullet">${feature}</li>` 
    });
    returnedList += '</ul>'
    return returnedList;
  }
  addFeature(featureArray) {
    Array.isArray(featureArray) ? null : console.log("Error. Please pass array as arguement to add feature method");
    featureArray.forEach((element) => {
      this.features.push(element);
    })
  }
  createTags() {
    let tagContainer = '<div class="tagContainer">'

    let hexTagColors = [
      [ "21BF2B", "F29F05", "F2622E", "0b76b7", "06a09b", "338a17", "b87503", "d74d26", "ba1e45", "444444", "2d7ff9", "18bfff", "20c933"], 
      ["cfdfff", "77d1f3", "72ddc3", "93e088", "ffd66e", "ffa981", "ff9eb7", "cccccc", 'cdb0ff', "cfdfff", "d0f0fd", "c2f5e9", "d1f7c4", "ffeab6", "fee2d5", "ffdce5", "ffdaf6", "ede2fe", "eeeeee"]]
    

    this.inc.forEach((tag) => {
      let className = tag.slice(0,tag.indexOf(" "))
      if(tag != 'None' && tag != 'NOMD' && tag != 'General Inquiry' && tag != 'General Pest') {
        if(tag in tagColors) {
          //tagColors
          tagContainer += `<div class="tag ${className}" onmouseout="unhighlightTag('${className}')" onmouseover="highlightTag('${className}')" style="background-color: #${tagColors[tag].background}; color: ${tagColors[tag].font}">${tag}</div>`
        } else {
          let lightOrDark = Math.floor(Math.random() * 10) < 8 ? 1 : 0;
          let fontColor = lightOrDark === 0 ?  "white" :  "#484848"
          let backgroundColor = hexTagColors[lightOrDark][Math.floor(Math.random() * hexTagColors[lightOrDark].length)]
          tagColors[tag] = {}
          tagColors[tag].background = backgroundColor
          tagColors[tag].font = fontColor;

          tagContainer += `<div class="tag ${className}" onmouseout="unhighlightTag('${className}')" onmouseover="highlightTag('${className}')" style="background-color: #${backgroundColor}; color: ${fontColor}">${tag}</div>`
        }
        
      }
      
    });

    tagContainer += "</div>"
    return tagContainer
  }
  featureSideBySide() {
    //list every feature
    //rebuild classes to have more properties
    //build methods that return features (features will he objects with a name, user friendly value that are formmated similarly and a boolean value used to style the object)
    //create a function that takes the two side by side. Lower down should be what's in common. The fxn should only show features that at least one of them has 
    //make the feature elements interactive on hover or click
  }


  frequencyFeature () {
    return new Feature("Frequency", `Includes <b>${this.freq}</b> services per year`, true)
  }
  includesPestFeature() {
    if(this.pest) {
      return new Feature("includesPest", "Includes continuing pest control", true)
    } else {
      return new Feature("includesPest", "Does <b>not</b> continuing pest control", false)
    }
  }
  includesRodentFeature() {
    if(this.rodent) {
      return new Feature("includesRodent", "Includes continuing rodent control", true)
    } else {
      return new Feature("includesRodent", "Does <b>not</b> include continuing rodent control", false)
    }
  }
  includesTermiteFeature() {
    if(this.termite === 2) {
      return new Feature("includesTermite", "Includes continuing termite control", true)
    } else if (this.termite === 1) {
      return new Feature("includesTermite", "Includes $200 voucher for any termites found", true)
    } else {
      return new Feature("includesTermite", "Does <b>not</b> include termite control", false)
    }
  }
  includesInteriorFeature() {
    if(this.interior) {
      return new Feature("includesInterior", "Includes interior treatment if issue breaks through protective barrier", true)
    } else {
      return new Feature("includesInterior", "Does <b>not</b> include interior treatment.", false)
    }
  }
  includesExteriorFeature() {
    if(this.exterior) {
      return new Feature("includesExterior", "Includes exterior treatment if issue breaks through protective barrier", true)
    } else {
      return new Feature("includesExterior", "Does <b>not</b> include exterior treatment.",false)
    }
  }
  includeTermiteMonitoringFeature() {
    if(this.monitor) {
      return new Feature("includeTermiteMonitors", "Includes annual termite monitoring with 4 visits to checkup", true)
    } else {
      return new Feature("includeTermiteMonitors", "Does <b>not</b> include termite monitoring", false)
    }
  }
  includeTreatmentWarranty() {
    if(this.warranty > 0) {
      return new Feature("includeTreatmentWarranty", `Includes warranty for ${this.warranty} days following last treatment`, true)
    } else {
      return new Feature("includeTreatmentWarranty", `Does not include warranty for treatment.`, false)
    }
  }
  includesCallbacks() {
    if(this.callback === 0) {
      return new Feature("includesCallbacks", "Callsbacks between services are included free of charge", true)
    } else {
      return new Feature("includesCallbacks", `Callbacks between services cost an additional $${this.callback}/visit`, false)
    }
  }
  wasMadeForNewHomes() {
    if(this.newHome) {
      return new Feature("madeForNewHomes", "Program was made for new homes", true)
    } else {
      return new Feature("madeForNewHomes", "Program is standard and not made for new homes", false)
    }
  }
  serviceFeature() {
    return new Feature("includesService","Service to remove the issue", true);
  }
  includesTermiteWarranty() {
    if(this.termiteWarranty) {
      return new Feature("includesTermiteWarranty", "Includes termite warranty in the cost that covers the cost of removing any termites found", true);
    } else {
      return new Feature("includesTermiteWarranty", "Does <b>not</b> include a termite warranty", false)
    }
  }
  includesPremiseG() {
    if(this.premise) {
      return new Feature("includesPremise", "Includes a Premise-G treatment for additional termite protection", true)
    } else {
      return new Feature("includesPremise", "Does <b>not</b> include Premise-G treatment", false)
    }
  }
  includesMosquito() {
    if(this.mosquito === 3) {
      return new Feature("includesMosquito", "Includes a mosquito treatment performed with a backpack sprayer AND a granular application", true)
    } else if(this.mosquito === 2) {
      return new Feature("includesMosquito", "Includes an In2Care Bucket for mosquito treatment",true)
    } else if(this.mosquito === 1) {
      return new Feature("includesMosquito", "Includes a mosquito treatment performed with a backpack sprayer",true)
    } else {
      return new Feature("includesMosquito", "Does <b>not</b> include mosquito treatments",false)
    }
  }
  includesAnnualInspection() {
    if(this.inspection) {
      return new Feature("annualInspection", "Includes an annual inspection by one of our expert technicians.", true)
    } else {
      return new Feature("annualInspection", "Does <b>not</b> include an annual termite inspection", false)
    }
  }
  tickTreatmentFeature() {
    if(this.tick) {
      return new Feature("includesTick", "Includes 2 granular application per year for ticks", true)
    } else {
      return new Feature("includesTick", "Does <b>not</b> include tick treatments", false)
    }
  }


}



class BimonthlyService extends Service {
  constructor(code, name, url, features, inc, ninc) {
    super(name);
    this.code = code;
    this.features = features;
    this.freq = 6;
    this.url = url;
    this.inc = ["General Inquiry", "General Pest", "American roaches", "Ants", "Box Elder Bugs", "Brown Banded Roaches", "Camel Crickets", "Carpet Beetles", "Centipedes", "Cigarette Beetles", "Clover Mites", "Drugstore Beetles", "Earwigs", "Field Crickets", "Fire Brats", "Fleas (interior)", "German Roaches", "Ground Beetles", "Indian Meal Moths", "Lady Bugs", "Mice", "Rodents", "Millipedes", "Oriental Roaches", "Pill Bugs", "Rats", "Rice Weevils", "Silverfish", "Smokeybrown Roaches", "Sow Bugs", "Spiders", "Springtails", "Stink Bugs", "Termites", "Ticks (interior)", "Wasps, at ground level"].concat(inc);
    this.ninc = ninc;
    this.pest = true;  // bool
    this.rodent = true;  // bool
    this.interior = true; //bool
    this.exterior = true; //bool
    this.monitor = false;//bool
    this.callback = 0; //number value representing ocst of callbacks
  }
}

class MonthlyService extends Service {
  constructor(code, name, url, features, inc, ninc) {
    super(name);
    this.code = code;
    this.features = features;
    this.freq = 12;
    this.url = url;
    this.inc = ["General Inquiry", "General Pest", "American roaches", "Ants", "Box Elder Bugs", "Brown Banded Roaches", "Camel Crickets", "Carpet Beetles", "Centipedes", "Cigarette Beetles", "Clover Mites", "Drugstore Beetles", "Earwigs", "Field Crickets", "Fire Brats", "Fleas (interior)", "German Roaches", "Ground Beetles", "Indian Meal Moths", "Lady Bugs", "Mice", "Rodents", "Millipedes", "Oriental Roaches", "Pill Bugs", "Rats", "Rice Weevils", "Silverfish", "Smokeybrown Roaches", "Sow Bugs", "Spiders", "Springtails", "Stink Bugs", "Termites", "Ticks (interior)", "Wasps, at ground level"].concat(inc);
    this.ninc = ninc;
    this.pest = true;  // bool
    this.rodent = true;  // bool
    this.interior = true; //bool
    this.exterior = true; //bool
    this.monitor = false;//bool
    this.callback = 0; //number value representing ocst of callbacks
    this.tick = false;
  }
}
class MosquitoService extends Service {
  constructor(code, name, url, features, freq, inc, ninc) {
    super(name);
    this.code = code;
    this.features = features;
    this.freq = freq;
    this.url = url;
    this.inc = ["Mosquito", "General Inquiry"].concat(inc);
    this.ninc = ["NOMD"].concat(ninc);
    this.pest  = false; // bool
    this.rodent = false;// bool
    this.termite  = false; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
    this.interior = false;//bool
    this.exterior = true; //bool
    this.monitor = false; //bool
    this.warranty = false; //number value representing days under warranty
    this.callback = 0; //number value representing ocst of callbacks
    this.newHome = false;//bool
    this.termiteWarranty = false; //bool
    this.premise = false;
    this.inspection = false; //bool
  }
}

class Warranty extends Service {
  constructor(code, name, url, features, inc) {
    super(name);
    this.code = code;
    this.features = [
      "Annual Termite Inspection",
      "1 year renewable warranty",
      ].concat(features);
    this.freq = 1;
    this.url = url;
    this.inc = ["General Inquiry", "Termites"].concat(inc);
    this.ninc = ["None"];
    this.pest = false; // bool
    this.rodent  = false; // bool
    this.termite  = 2; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
    this.interior  = false; //bool
    this.exterior  = false; //bool
    this.monitor  = false; //bool
    this.warranty = 365; //number value representing days under warranty
    this.callback = 0; //number value representing ocst of callbacks
    this.newHome  = true; //bool
    this.termiteWarranty  = true; //bool
    this.mosquito = false //3= backpack + granular, 2= in2, 1= backpack, 0=none
    this.inspection  = false //bool
    this.tick  = false //bool
    this.premise = false;
  }
}

class TermiteMonitoring extends Service {
  constructor(code, name, url, features, inc) {
    super(name);
    this.code = code;
    this.features = [
      "Annual Interior & Exterior termite inspection",
      "3 Additional Visits to Check Termite Monitoring Stations",
      "Warranty that covers the cost of any necessary treatment to remove termites that are found"
      ].concat(features);
    this.freq = 4;
    this.url = url;
    this.inc = ["General Inquiry", "Termites", "Termite Monitoring"].concat(inc);
    this.ninc = ["None"];
    this.pest = false;   // bool
    this.rodent = false;  // bool
    this.termite = true;  // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
    this.interior = true;  //bool
    this.exterior = true; //bool
    this.monitor = true; //bool
    this.warranty = 365; //number value representing days under warranty
    this.callback = 0;//number value representing ocst of callbacks
    this.newHome = false; //bool
    this.termiteWarranty = true; //bool
    this.premise = false;
    this.mosquito  = false; //3= backpack + granular, 2= in2, 1= backpack, 0=none
    this.inspection = true;//bool
    this.tick = false; //bool
  }
}

class RecuringServiceWithTermiteMonitoring extends Service {
  constructor(code, name, url, features, freq, inc) {
    super(name);
    this.code = code;
    this.features = [
      "Annual Interior & Exterior termite inspection",
      "3 Additional Visits to Check Termite Monitoring Stations",
      "Warranty that covers the cost of any necessary treatment to remove termites that are found"
      ].concat(features);
    this.freq = freq;
    this.url = url;
    this.inc = ["General Inquiry", "General Pest", "American roaches", "Ants", "Box Elder Bugs", "Brown Banded Roaches", "Camel Crickets", "Carpet Beetles", "Centipedes", "Cigarette Beetles", "Clover Mites", "Drugstore Beetles", "Earwigs", "Field Crickets", "Fire Brats", "Fleas (interior)", "German Roaches", "Ground Beetles", "Indian Meal Moths", "Lady Bugs", "Mice", "Rodents", "Millipedes", "Oriental Roaches", "Pill Bugs", "Rats", "Rice Weevils", "Silverfish", "Smokeybrown Roaches", "Sow Bugs", "Spiders", "Springtails", "Stink Bugs", "Termites", "Ticks (interior)", "Wasps, at ground level","General Inquiry", "Termites", "Termite Monitoring"].concat(inc);
    this.ninc = ["None"];
    this.termite = true;  // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
    this.interior = true;  //bool
    this.exterior = true; //bool
    this.monitor = true; //bool
    this.warranty = 365; //number value representing days under warranty
    this.callback = 0;//number value representing ocst of callbacks
    this.newHome = true; //bool
    this.termiteWarranty = true; //bool
    this.inspection = true;//bool
    this.tick = false; //bool
  }
}

class OneTimeService extends Service {
  constructor(code, name, url, features, warrantyDays, additionalVisits, challengeLevel, inc, ninc) {
    super(name);
    this.code = code;
    this.features = [].concat(features).concat([
      `Service will require ${additionalVisits} additional visits`,
      warrantyDays > 0 ? `Includes a ${warrantyDays} day warranty on service. ` : "Does not include a warranty on the service"
    ]);
    this.warrantyDays = warrantyDays;
    this.additionalVisits = additionalVisits;
    this.freq = 1;
    this.url = url;
    this.challengeLevel = challengeLevel;
    this.inc = [].concat(inc);
    this.ninc = ninc;
    this.pest = false; // bool
    this.rodent  = false; // bool
    this.termite  = false;  // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
    this.interior = true; //bool
    this.exterior = true; //bool
    this.monitor  = false; //bool
    this.warranty = warrantyDays; //number value representing days under warranty
    this.callback = 75; //number value representing ocst of callbacks
    this.newHome = false; //bool
    this.termiteWarranty = false;  //bool
    this.premise = false; 
    this.mosquito = false;  //3= backpack + granular, 2= in2, 1= backpack, 0=none
    this.inspection = false;  //bool
    this.tick = false;  //bool
  }
}

let qpc = new Service ("Quarterly Pest and Rodent Program");
qpc.code = "QPC";
qpc.url = "";
qpc.freq = 4;
qpc.features = [
  "Rodents, sealing entry points and any baiting necessary",
  "Callbacks included!",
  "Coverage for many common pests seen in new homes",
  "Interior treatments when pests break through our Protective Barrier tm.",
  "Planned <b>quarterly</b> visits"
];
qpc.inc = ["General Inquiry", "General Pest", "American roaches", "Ants", "Box Elder Bugs", "Brown Banded Roaches", "Camel Crickets", "Carpet Beetles", "Centipedes", "Cigarette Beetles", "Clover Mites", "Drugstore Beetles", "Earwigs", "Field Crickets", "Fire Brats", "Fleas (interior)", "German Roaches", "Ground Beetles", "Indian Meal Moths", "Lady Bugs", "Mice", "Rodents", "Millipedes", "Oriental Roaches", "Pill Bugs", "Rats", "Rice Weevils", "Silverfish", "Smokeybrown Roaches", "Sow Bugs", "Spiders", "Springtails", "Stink Bugs", "Termites", "Ticks (interior)", "Wasps, at ground level"]
qpc.ninc = ["Not Ground Level Wasps", "Mosquito", "Termites"]
this.pest   = true; // bool
this.rodent = false; // bool
this.termite  = false; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
this.interior = true; //bool
this.exterior = true //bool
this.monitor = false //bool
this.warranty = 30; //number value representing days under warranty
this.callback = 75; //number value representing ocst of callbacks
this.newHome = false; //bool
this.termiteWarranty = false; //bool
this.premise = false
this.mosquito = 0; //3= backpack + granular, 2= in2, 1= backpack, 0=none
this.inspection = false //bool
this.tick = false //bool

let pcg = {
  levelOne: new OneTimeService(
    "PCG",
    "L1 One-Time General Pest Control Service",
    "",
    ["Remove the issue. Includes " + this.inc],
    60,
    0,
    1,
    ["Box Elder Bugs", "Carpet Beetles", "Cigarette Beetles", "Clover Mites", "Ground Beetles", "Pill Bugs",  "Sow Bugs", "Wasps, at ground level", "Bees, at ground level"],
    ["None"]
  ),
  levelTwo: new OneTimeService (
    "PCG",
    "L2 One-Time General Pest Control Service",
    "",
    ["Remove the issue."],
    60,
    0,
    2,
    ["Spiders", "Springtails", "Stink Bugs", "Centipedes", "Drugstore Beetles", "Earwigs", "Field Crickets", "Fire Brats", "Lady Bugs",  "Millipedes", "Rice Weevils", "Silverfish"],
    ["None"]
  ),
  levelThree: new OneTimeService (
    "PCG",
    "L3 One-Time General Pest Control Service",
    "",
    ["Remove the issue."],
    30,
    2,
    3,
    ["American roaches",  "Brown Banded Roaches", "Indian Meal Moths", "Camel Crickets", "Fleas (interior)", "Oriental Roaches", "Ticks (interior)"],
    ["None"]
  ),
  levelFour: new OneTimeService (
    "PCG",
    "L4 One-Time General Pest Control Service",
    "",
    ["Remove the issue."],
    30,
    0,
    4,
    ["Not Ground Level Wasps", "Bees, above ground level"],
    ["None"]
  )
}

let pct = {
  levelOne: new OneTimeService(
    "PCT",
    "L1 WDI Termite Job",
    "",
    ["Transferrable WDI report to new homeowner", "DOES NOT INCLUDE COST TO REMOVE ANY TERMITES FOUND"],
    365,
    1,
    1,
    ["Termites", "General Inquiry"],
    ["None"]
  ),
  levelTwo: new OneTimeService(
    "PCT",
    "L2 One-Time Termite Work",
    "",
    ["Application of termiticide. Available and effective for small issues."],
    365,
    2,
    2,
    ["Termites"],
    ["None"]
  ),
  levelThree: new OneTimeService(
    "PCT",
    "L3 One-Time Termite Work",
    "",
    ["Application of termiticde and extensive drilling covered"],
    365,
    3,
    3,
    ["Termites"],
    ["None"]
  ),

};

let pcr = {
  levelOne: new OneTimeService(
    "PCR",
    "L1 Pest Control Rodent Job",
    "",
    ["Sticky traps laid out by expert techncians in key locations", "Removal of any dead rodents"],
    30,
    2,
    1,
    ["Rodents", "Mice", "Rats"],
    ["None"]),
  levelTwo: new OneTimeService(
    "PCR",
    "L2 Pest Control Rodent Job",
    "",
    ["Ants", "Bait stations laid out by expert techncians in key locations", "Removal of any dead rodents", "$100 for additional services"],
    0,
    3,
    2,
    ["Rodents", "Mice", "Rats"],
    ["None"]),
  levelThree: new OneTimeService(
    "PCR",
    "L3 Pest Control Rodent Job",
    "",
    ["Sticky traps laid out by expert techncians in key locations", "Rodent bait stations", "All tools necessary to remove infestation", "Removal of any dead rodents", "$80 for additional services"],
    0,
    4,
    3,
    ["Rodents", "Mice", "Rats"],
    ["None"])
}


let all = new BimonthlyService(
  "ALL",
  "All in One Program",
  "https://offer.bettertermite.com/all",
  [
    "INCLUDES Annual Termite Renewal",
    "Annual preventative treatment for termites with premise G",
    "Bimonthly pest and rodent prevention",
    "No cost for callback"
  ],
  [],
  ["Not Ground Level Wasps", "Mosquito"]
);

all.termite = 2;
all.warranty = 60;
all.termiteWarranty = true;
all.premise = true;
all.mosquito = 0;
all.inspection = true;
all.tick = false;
all.newHome = true;

let bim = new BimonthlyService(
  "BIM",
  "Bi-monthly Pest and Rodent Program",
  "",
  [
    "Rodents, sealing entry points and any baiting necessary",
    "Callbacks included!",
    "Coverage for many common pests seen in new homes",
    "Interior treatments when pests break through our Protective Barrier tm.",
    "Planned bimonthly visits"
  ],
  [],
  ["Not Ground Level Wasps", "Mosquito", "Termites"]
);

bim.termite = 0;
bim.warranty = 60;
bim.termiteWarranty = false;
bim.premise = false;
bim.mosquito = 0;
bim.inspection = false;
bim.tick = false;

let allstarnewva = new MonthlyService(
  "ALL STAR", 
  "All Star Program",
  "https://offer.bettertermite.com/star-va",
  [
    "INCLUDES Annual Termite Renewal", 
    "Annual preventative treatment for termites with premise G",
    "Monthly pest and rodent prevention",
    "No cost for callback",
    "ONLY IN VA: Outside tick and mosquito treatment"
  ],  
  ["Mosquito"], 
  ["Not Ground Level Wasps"]
);

allstarnewva.termite =  2; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
allstarnewva.warranty = 60; //number value representing days under warranty
allstarnewva.newHome = true; //bool
allstarnewva.termiteWarranty = true; //bool
allstarnewva.premise = true;
allstarnewva.mosquito = 1; //3= backpack + granular, 2= in2, 1= backpack, 0=none
allstarnewva.inspection = true; //bool


let mos = new MonthlyService(
  "MOS", 
  "Monthly Pest and Rodent Program",
  "",
  [
    "Rodents, sealing entry points and any baiting necessary",
    "Callbacks included!",
    "Coverage for many common pests seen in new homes",
    "Interior treatments when pests break through our Protective Barrier tm.",
    "Planned <b>monthly</b> visits"
  ],  
  [""], 
  ["Not Ground Level Wasps", "Mosquito", "Termites"]
);

mos.termite =  0; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
mos.warranty = 60; //number value representing days under warranty
mos.newHome = false; //bool
mos.termiteWarranty = false; //bool
mos.premise = false;
mos.mosquito = 0; //3= backpack + granular, 2= in2, 1= backpack, 0=none
mos.inspection = false; //bool

let allstarnewmd = new MonthlyService(
  "ALL STAR", 
  "All Star Program",
  "https://offer.bettertermite.com/star-md",
  [
    "INCLUDES Annual Termite Renewal", 
    "Annual preventative treatment for termites with premise G",
    "Monthly pest and rodent prevention",
    "No cost for callback"
  ],
  ["None"],   
  ["Not Ground Level Wasps"]
);

allstarnewmd.termite =  2; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
allstarnewmd.warranty = 60; //number value representing days under warranty
allstarnewmd.newHome = true; //bool
allstarnewmd.termiteWarranty = true; //bool
allstarnewmd.premise = true;
allstarnewmd.mosquito = 0; //3= backpack + granular, 2= in2, 1= backpack, 0=none
allstarnewmd.inspection = true; //bool

let earbuilder = new Warranty(
  "EAR",
  "Enhanced Termite Renewal",
  "",
  [
   "<b>Application of Premise-G (this is the part that’s different)</b>"
  ],
  ["None"],
  ["None"]

);

earbuilder.premise = true;

let wtr = new Warranty(
  "WTR",
  "Wood Treat Renewal",
  "https://www.bettertermite.com/warranty/",
  [],
  ["None"],
  ["None"]
)

let ptr = new Warranty(
  "PTR",
  "Pre-Treat Renewal",
  "https://www.bettertermite.com/warranty/",
  [],
  ["None"],
  ["None"]
)

let per = new Warranty(
  "PER",
  "Pre-treat Exterior Renewal",
  "https://www.bettertermite.com/warranty/",
  [],
  ["None"],
  ["None"]
)

let anr = new Warranty(
  "ANR",
  "Annual Termite Renewal",
  "https://www.bettertermite.com/warranty/",
  [],
  ["None"],
  ["None"]
);

let atm = new TermiteMonitoring(
  "ATM",
  "Annual Termite Monitoring",
  "",
  [],
  ["None"],
  ["None"]
)

let etm = new TermiteMonitoring(
  "ETM",
  "Enhanced Annual Termite Monitoring",
  "",
  ["<b>Annual re-application of preventative termite treatment</b>"],
  ["None"],
  ["None"]
)

etm.premise = true;

let castle = new BimonthlyService(
  "CASTLE",
  "CASTLE PROGRAM",
  "https://offer.bettertermite.com/castle",
  [
    "DOES NOT INCLUDE STANDARD TERMITE WARRANTY OR PREMISE-G",
    "Annual Termite inspection",
    "$200 voucher towards treatment to remove any termites found",
    "Bimonthly Pest and Rodent Control"
    
  ],
  ["None"],
  ["Not Ground Level Wasps"]
);
castle.termite = 1;
castle.warranty = 60;
castle.termiteWarranty = false;
castle.premise = false;
castle.mosquito = 0;
castle.inspection = true;
castle.tick = false;



let castleplusva = new MonthlyService(
  "CASTLE PLUS",
  "CASTLE PROGRAM",
  "https://offer.bettertermite.com/castle-plus",
  [
    "DOES NOT INCLUDE STANDARD TERMITE WARRANTY OR PREMISE-G",
    "Annual Termite inspection",
    "$200 voucher towards treatment to remove any termites found",
    "Monthly Pest and Rodent Control",
    "ONLY IN VA: Outside tick and mosquito treatment"
  ],
  ["None"],
  ["Not Ground Level Wasps"]
);
castleplusva.termite =  1; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
castleplusva.warranty = 60; //number value representing days under warranty
castleplusva.newHome = true; //bool
castleplusva.termiteWarranty = false; //bool
castleplusva.premise = false;
castleplusva.mosquito = 1; //3= backpack + granular, 2= in2, 1= backpack, 0=none
castleplusva.inspection = true; //bool


let castleplusmd = new MonthlyService(
  "CASTLE PLUS",
  "CASTLE PROGRAM",
  "https://offer.bettertermite.com/castle-plus",
  [
    "DOES NOT INCLUDE STANDARD TERMITE WARRANTY OR PREMISE-G",
    "Annual Termite inspection",
    "$200 voucher towards treatment to remove any termites found",
    "Monthly Pest and Rodent Control"
    
  ],
  ["None"],
  ["Not Ground Level Wasps"]
);

castleplusmd.termite =  1; // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
castleplusmd.warranty = 60; //number value representing days under warranty
castleplusmd.newHome = true; //bool
castleplusmd.termiteWarranty = false; //bool
castleplusmd.premise = false;
castleplusmd.mosquito = 0; //3= backpack + granular, 2= in2, 1= backpack, 0=none
castleplusmd.inspection = true; //bool


let moq = new MosquitoService(
  "MOQ",
  "Standard Mosquito Plan",
  "https://www.bettertermite.com/mosquito-bites/",
  [
    "Covers a mosquito treatment with the backpack sprayer"
  ],
  6,
  ["None"],
  ["None"]
);

moq.mosquito = 1; //3= backpack + granular, 2= in2, 1= backpack, 0=none
moq.tick = false; //bool

let ls = new MosquitoService(
  "LS",
  "LawnShield Tick & Mosquito Program",
  "https://www.bettertermite.com/tick-mosquito-reduction/",
  [
    "Site survey: look for potential mosquito breeding sites and where ticks might be in foliage",
    "Covers a mosquito treatment with the backpack sprayer and a granular application t low places that hold water",
    "We do 2 granular applications in the Spring and late Fall and use the sprayer to treat for ticks as well"

  ],
  9,
  ["Ticks, exterior"],
  ["None"]
);

ls.mosquito = 3; //3= backpack + granular, 2= in2, 1= backpack, 0=none
ls.tick = true; //bool

let in2 = new MosquitoService(
  "IN2",
  "IN2Care Mosquito Plan",
  "https://www.bettertermite.com/mosquito-bites/",
  [
    "Covers a mosquito treatment with an In2Care Bucket"
  ],
  6,
  ["None"],
  ["None"]
);

in2.mosquito = 2; //3= backpack + granular, 2= in2, 1= backpack, 0=none
in2.tick = false; //bool

let allWithTermiteMonitoring = new RecuringServiceWithTermiteMonitoring(
  "ALL",
  "All in One Program with Termite Monitoring",
  "https://offer.bettertermite.com/all",
  [
    "INCLUDES Annual Termite Renewal",
    "Annual preventative treatment for termites with premise G",
    "Bimonthly pest and rodent prevention",
    "No cost for callback"
  ],
  6,
  [],
  ["Not Ground Level Wasps", "Mosquito"]
);
allWithTermiteMonitoring.pest = true;   // bool
allWithTermiteMonitoring.rodent = true;  // bool
allWithTermiteMonitoring.premise = true;
allWithTermiteMonitoring.mosquito  = 0; //3= backpack + granular, 2= in2, 1= backpack, 0=none



let allStarVaTermiteMonitoring = new RecuringServiceWithTermiteMonitoring(
  "ALL STAR",
  "All Star Program with Termite Monitoring",
  "https://offer.bettertermite.com/star-va",
  [
    "INCLUDES Annual Termite Renewal",
    "Annual preventative treatment for termites with premise G",
    "Monthly pest and rodent prevention",
    "No cost for callback",
    "Spring, Summer and Fall Mosquito prevention"
  ],
  12,
  ["Mosquito"],
  ["Not Ground Level Wasps"]
);

allStarVaTermiteMonitoring.pest = true;   // bool
allStarVaTermiteMonitoring.rodent = true;  // bool
allStarVaTermiteMonitoring.premise = true;
allStarVaTermiteMonitoring.mosquito  = 1; //3= backpack + granular, 2= in2, 1= backpack, 0=none

let allStarMdTermiteMonitoring = new RecuringServiceWithTermiteMonitoring(
  "ALL STAR",
  "All Star Program with Termite Monitoring",
  "https://offer.bettertermite.com/star-md",
  [
    "INCLUDES Annual Termite Renewal",
    "Annual preventative treatment for termites with premise G",
    "Monthly pest and rodent prevention",
    "No cost for callback"
  ],
  12,
  [],
  ["Not Ground Level Wasps", "Mosquito"]
);

allStarMdTermiteMonitoring.pest = true;   // bool
allStarMdTermiteMonitoring.rodent = true;  // bool
allStarMdTermiteMonitoring.premise = true;
allStarMdTermiteMonitoring.mosquito  = 0; //3= backpack + granular, 2= in2, 1= backpack, 0=none


let allServices = [
  all, 
  allstarnewva, 
  allstarnewmd, 
  castle, 
  castleplusva, 
  castleplusmd, 
  ls, 
  moq, 
  in2, 
  anr, 
  ptr, 
  per, 
  wtr, 
  earbuilder, 
  etm, 
  atm, 
  allStarVaTermiteMonitoring, 
  allStarMdTermiteMonitoring, 
  allWithTermiteMonitoring, 
  pcg.levelOne, 
  pcg.levelTwo,
  pcg.levelThree,
  pcg.levelFour,
  pct.levelOne,
  pct.levelTwo,
  pct.levelThree,
  pcr.levelOne,
  pct.levelTwo,
  pct.levelThree,
  qpc,
  bim,
  mos
];

function addService(serviceObj) {
  proposedServices.push([
    serviceObj["code"], //0
    serviceObj["name"],  //1
    serviceObj["setupFee"], //2
    serviceObj["perServiceFee"], //3
    serviceObj["freq"], //4
    serviceObj["propsalValue"], //5
    serviceObj.featureList(), //6
    serviceObj["url"], //7
    serviceObj["inc"],//8
    serviceObj["ninc"], //9
    serviceObj.createTags(), //10
    [
      serviceObj.serviceFeature(), //11[0]
      serviceObj.frequencyFeature(),  //11[1]
      serviceObj.includesPestFeature(), //11[2]
      serviceObj.includesRodentFeature(), //11[3]
      serviceObj.includesTermiteFeature(), //11[4]
      serviceObj.includesInteriorFeature(), //11[5]
      serviceObj.includesExteriorFeature(), //11[6]
      serviceObj.includeTermiteMonitoringFeature(), //11[7]
      serviceObj.includesTermiteWarranty(), //11[8]
      serviceObj.includesCallbacks(), //11[9]
      serviceObj.wasMadeForNewHomes(), //11[10]
      serviceObj.includesPremiseG(), //11[11]
      serviceObj.includesMosquito(), //11[12]
      serviceObj.includesAnnualInspection(), //11[13]
      serviceObj.tickTreatmentFeature() //11[14]
    ]]);
}

function logServices(arrayOfServices) {
  // this handles errors involved with no avaialble services 
  if(arrayOfServices.length < 1) {
    createError(["The search created no results. Please try different parameters."])
    return;
  }
  getHighestDifficultyService();
  


  //sort it so the highest cost services are on top
  let sortedArray = [];
  arrayOfServices.forEach((service) => {
    
    if(sortedArray.length < 1) { sortedArray.push(service) }
    else {
      for(i=0; i < sortedArray.length; i++) {
        if(service[5] > sortedArray[i][5]) {
          sortedArray.splice(i,0, service);
          break;
        }
        if(i === sortedArray.length) {
          sortedArray.splice(i,0, service);
        }
      }
    } 
  });
  arrayOfServices = sortedArray;
  proposedServices = sortedArray;
  if(kill) { return }


  //<a href="${row[7]}"  target="_blank" rel="noopener noreferrer">${row[0]}</a>
  arrayOfServices.forEach(row => {
    row[7] != "" ?  hrefCode = `<a href="${row[7]}"  target="_blank" rel="noopener noreferrer">${row[0]}</a>` : hrefCode = row[0];
    

    table += 
    `<tr class="tableContents serviceRow" onClick="toggleRowSelecct(${arrayOfServices.indexOf(row)})">
        <td class="checkboxContainer" style="padding: 0px !important"><input type="checkbox" class="serviceCheckbox" value="${arrayOfServices.indexOf(row)}" name="chosenServices" id="checkbox${arrayOfServices.indexOf(row)}"></td>
        <td>${hrefCode}</td>
        <td>${row[1]}</td>
        <td>$${row[2]}</td>
        <td>$${row[3]}</td>
        <td>${row[4]}x/year</td>
        <td>$${row[5]}</td>
        <td>${row[6]}</td>
        <td>${row[10]}</d>
    </tr>`

  });
  

  document.getElementById("proposedServiceTable").innerHTML = table;
  table = head; //reset the global table value at the end so that it doesn't keep growing
  //removeLastArrayColumn(arrayOfServices)
  
}

const toggleRowSelecct = (row) => {
  let checkBoxId = "checkbox" + row;
  let checkboxElement = document.getElementById(checkBoxId);
  if(document.querySelector("#" + checkBoxId).checked === true) {
    checkboxElement.checked = false;
  } else {
    checkboxElement.checked = true;
  }


}

const showSideBySide = () => {
  //toggle table visibilities 
  document.getElementById("proposedServiceTable").classList.add("hidden")
  document.getElementById("sideBySideTable").classList.remove("hidden")
  
  //create an array with the indexes values of the services in the propseed services array
  let selectedService = document.querySelectorAll('input[name="chosenServices"]:checked');
  let selectedServiceArray = [];
  selectedService.forEach((checkbox) => {
    selectedServiceArray.push(Number(checkbox.value));
  });
  selectedServiceArray.reverse();
 


  let outputRows = "";

  //create the column headers
  if(selectedServiceArray.length >= 2 && selectedServiceArray.length <= 4 ) {
    outputRows += `<table style="width: ${selectedServiceArray.length * 500}px">`
    outputRows += `<tr class="tableHeader" style="width: 500px !important">`
    selectedServiceArray.forEach((service) => {
      outputRows += `<th style="width: 200px" class="sideBySideTableHeader">
      <h1>${proposedServices[service][1]}</h1> 
      <h2>$${proposedServices[service][2]} + $${proposedServices[service][3]}/service</h2>
      <h2>$${proposedServices[service][5]}/first year</h2>
      </th>`
    })
    outputRows += "</tr>"



    

    /** 
    //create feature list
    outputRows += "<tr>"
    selectedServiceArray.forEach((service) => {
      outputRows += `<td class="sideBySideCells sideBySideFeatureList">${proposedServices[service][6]}</td>`
    })
    outputRows += "</tr>"
  */
    //create buckets for different features
    const inCommonFeatureIndexes = [];

    let count = 0;

    let numServicesToCompare = selectedServiceArray.length;

    //start with the one to the furthest right
    const furthestRightArrayFeatures = proposedServices[selectedServiceArray[selectedServiceArray.length-1]][11];
    

    furthestRightArrayFeatures.forEach((feature) => {
      //check other array elements to see if they have the feature
      
      if(feature.doesInclude) {
        let featureIndex = furthestRightArrayFeatures.indexOf(feature);
        selectedServiceArray.forEach((serviceIndex) => {
          if(proposedServices[serviceIndex][11][featureIndex].doesInclude)  {
            count += 1
          }
        })
        //inCommonFeatureIndexes.push(furthestRightArrayFeatures.indexOf(feature))
        
        if(count === numServicesToCompare) {
          inCommonFeatureIndexes.push(featureIndex)
        }
        

        count = 0;
      }})
      
    selectedServiceArray.forEach((serviceIndex) => {
      proposedServices[serviceIndex][11].forEach((subfeature) => {
        if(subfeature.doesInclude && !inCommonFeatureIndexes.includes(proposedServices[serviceIndex][11].indexOf(subfeature))) {
          inCommonFeatureIndexes.push(proposedServices[serviceIndex][11].indexOf(subfeature))
        }
      })
    })
    //combine them into a single array for easy iteration in the next step
  

    outputRows += "<tr>"
    selectedServiceArray.forEach((service) => {
      outputRows += `<td class="sideBySideCells"><h4 class ="centeredText">Feature Comparison</h4><p>Hover over the different side by side elements of the service to compare options.</p></td>`
    })
    outputRows += "</tr>"


    inCommonFeatureIndexes.forEach((inCommonFeatureIndex) => {
      outputRows += "<tr>"

      
      selectedServiceArray.forEach((servicesFeature) => {
        
        let includeClass = `${proposedServices[servicesFeature][11][inCommonFeatureIndex]["type"]}`
        console.log(includeClass)
        let featureValue = `${proposedServices[servicesFeature][11][inCommonFeatureIndex]["value"]}`

        if(proposedServices[servicesFeature][11][inCommonFeatureIndex]["doesInclude"]) {
          outputRows += `<td class="sideBySideCells doesIncludeCell featureCell"><ul class="doesIncludeList"><li class="doesIncludeBullet"><span class="green ${includeClass}" onmouseover="underlineFeatures('${includeClass}')" onmouseout="deUnderlineFeatures('${includeClass}')">${featureValue}</span></li></ul></td>`
        } else {
          outputRows += `<td class="sideBySideCells doesNotIncludeCell featureCell"><ul class="doesNotIncludeList"><li class="doesNotIncludeBullet"><span class="red ${includeClass}" onmouseover="underlineFeatures('${includeClass}')" onmouseout="deUnderlineFeatures('${includeClass}')">${featureValue}</span></li></ul></td>`
        }
        
      })

      outputRows += "</tr>"
    })




    outputRows += "<tr>"
    selectedServiceArray.forEach((service) => {
      outputRows += `<td class="sideBySideCells"><h4 class ="centeredText">Covered Pests</h4><p>Hover over the different pests below to see if there is a match between the services. Matches will be highlighted red and focused.</p></td>`
    })
    outputRows += "</tr>"

    //create covered pest list
    outputRows += "<tr>"
    selectedServiceArray.forEach((service) => {
      outputRows += `<td class="sideBySideCells bottomCell pestCell">${proposedServices[service][10]}</td>`
    })
    outputRows += "</tr>"

    outputRows += "</table>"
  
  document.getElementById("sideBySideTable").innerHTML = outputRows;
  } else if (selectedServiceArray.length > 4) {
    document.getElementById("sideBySideTable").innerHTML = `<div class="errorRow">You've selected more than the maximum of 4 services. Want to go back? <br><br> <a href="javascript:void(0)" class="navbarItem" style="border: black solid 1px; padding: 5px;" onClick="showServicesTable()">Click Here</a> </div>`
  
  } else {
    document.getElementById("sideBySideTable").innerHTML = `<div class="errorRow">Please make sure to select a service. Want to go back? <br><br> <a href="javascript:void(0)" class="navbarItem" style="border: black solid 1px; padding: 5px;" onClick="showServicesTable()">Click Here</a> </div>`
  }
  
  
}


function highlightTag (tag) {
  let tagsToBlur = Array.from(document.getElementsByClassName("tag"));
  tagsToBlur.forEach((tagToModify) => {
    tagToModify.classList.add("blur");
  });
  
  let allTagElements = document.getElementsByClassName(tag)
  let allTagElementsArray = Array.from(allTagElements)
  allTagElementsArray.forEach((tagToModify) => {
    tagToModify.classList.add("highlightedTag");
    tagToModify.classList.remove("blur");
  });


}

function unhighlightTag(tag) {
  let allTagElements = document.getElementsByClassName(tag)
  let allTagElementsArray = Array.from(allTagElements)
  allTagElementsArray.forEach((tagToModify) => {
    tagToModify.classList.remove("highlightedTag");
  });

  let tagsToUnBlur = Array.from(document.getElementsByClassName("blur"));
  tagsToUnBlur.forEach((tagToModify) => {
    tagToModify.classList.remove("blur");
  });
}

function underlineFeatures(includeFeatureClass) {
  console.log(includeFeatureClass)
  let tagsToUnderlineGreen = Array.from(document.getElementsByClassName(includeFeatureClass));
  console.log(tagsToUnderlineGreen)
  tagsToUnderlineGreen.forEach((feature) => {
    feature.classList.add("underline");
  })
} 

//onmouseout="deUnderlineFeatures('${includeClass}')"
function deUnderlineFeatures(includeFeatureClass) {
  console.log(includeFeatureClass)
  let tagsToUnderlineGreen = Array.from(document.getElementsByClassName(includeFeatureClass));
  console.log(tagsToUnderlineGreen)
  tagsToUnderlineGreen.forEach((feature) => {
    feature.classList.remove("underline");
  })
} 



const showServicesTable = () => {
  //toggle table visibilities 
  document.getElementById("proposedServiceTable").classList.remove("hidden");
  document.getElementById("sideBySideTable").classList.add("hidden");  

}


//this function creates the checkboxes for all the different services. It uses all of the service objects to see what options are avialable. This makes it easier to maintain the checkbox list
function renderIssueOptions(serviceList, checkboxContainer) {
  let elements = '';
  let fullArrayOfIssueTypes = []
  
  //create that pulls unique values from each of the service objects inc and ninc prooperties. Run through each element and if it doesn't exist yet in the array, push it to the array to use
  serviceList.forEach((service) => {
    service.inc.forEach((issue) => {
      if (!fullArrayOfIssueTypes.includes(issue)) { fullArrayOfIssueTypes.push(issue) }
    });
    service.ninc.forEach((issue) => {
      if (!fullArrayOfIssueTypes.includes(issue)) { fullArrayOfIssueTypes.push(issue) }
    });

  });


  //remove tags that shouldn't be there
  fullArrayOfIssueTypes = fullArrayOfIssueTypes.filter(eachService => eachService != "NOMD" && eachService != "None" && eachService != "" && eachService != "General Pest")


  //convert the full array into an html block of checkbox elements, then set the container's html to this html string
  fullArrayOfIssueTypes.forEach((uniqueService) => {
    elements += `
    <div class="formbuilder-checkbox">
      <input name="issues[]" access="false" id="${uniqueService}" required="required" aria-required="true" value="${uniqueService}" type="checkbox">
      <label for="issues-0">${uniqueService}</label>
    </div>
    `
  });
  document.getElementById(checkboxContainer).innerHTML = elements;
  document.getElementById("General Inquiry").checked = true;
  document.getElementById("Stink Bugs").checked = true;
}

//run the function right away so that it can be used for calculations
renderIssueOptions(allServices, "issuesContainer");

//reusable clear page function taking arrays of elements to clear as arguements
function clearPage(selectIDs, checkListContainers, dropDownIDs) {
  document.getElementById("proposedServiceTable").innerHTML = head;
  proposedServiceTable = '';
  selectIDs.forEach((selectField) => {
    console.log(document.getElementById(selectField))
    document.getElementById(selectField).value = "";
  });
  checkListContainers.forEach((checklist) => { 
    document.getElementById((checklist)).innerHTML = "";
  });
  dropDownIDs.forEach((dropdown) =>{
    document.getElementById(dropdown).value = "";
  })
  renderIssueOptions(allServices, "issuesContainer");
}

//this one clears the warranty page
function clearWarrantyPage() {
    clearPage(["renewalDate","renewalFee","size","buildDate"], ["issuesContainer"], ["service", "homeType", "severity", "state"]);
}

function clearNewCustomerPage() {
  clearPage(["size","buildDate"], ["issuesContainer"], ["homeType", "severity", "state"]);
}

function clearRecurringServicePage() {
  clearPage(["serviceFee","size","buildDate"], ["issuesContainer"], ["service", "homeType", "severity", "state"])
}


//function that gets checkbox group by name, and returns an array of all it's elements checked. Fxn takes arguements: name of input <str>  
function getAllCheckedBoxes(nameOfInput){
  let checkBoxes = document.querySelectorAll('input[name="issues[]"]:checked');
  let arrayToReturn = [];
  checkBoxes.forEach((checkBox) => {
    arrayToReturn.push(checkBox.value)
  })
  return arrayToReturn;
}

//this function is used to raise all prices
function globalPriceRaise(fee) {
    priceRaiseBy = 1 + (priceRaisePercent/100);
    return Math.ceil((priceRaiseBy * fee)/5)*5
}

//this filters to include any services that have matching issues with the requested issues
function filterArrayForArrayMatch(filterArray,arrayToCheck, checkArrayIndex) {
  //create an output array to return
  let filteredArray = [];
  let tagCounter = 0;
  //iterate through each row
  arrayToCheck.forEach((row) =>{
    //iterate through each tag added to the row array
    row[checkArrayIndex].forEach(tag => {
      //check if the array of customer issues matches the service's tags; add the rows that do to the array to return
      if(filterArray.includes(tag)) {
        tagCounter += 1;
      }
    })
    if (tagCounter > 0) { filteredArray.push(row) }
    tagCounter = 0;
  });
  return(filteredArray)
}

//this excludes any services that the customer would not find useful or is not eligible
function filterArrayForNotArrayMatch(filterArray,arrayToCheck, checkArrayIndex) {
  //create an output array to return
  let filteredArray = [];
  let tagCounter = 0;
  //iterate through each row
  arrayToCheck.forEach((row) =>{
    //iterate through each tag added to the row array
    row[checkArrayIndex].forEach(tag => {
      //check if does NOT the array of customer issues matches the service's tags; add the rows that do to the array to return
      if(!filterArray.includes(tag)) {
        tagCounter += 1;
      }
    })
  if (tagCounter > 0) { filteredArray.push(row); }
    tagCounter = 0;
    });
  return(filteredArray)
}  

//this removes the tags used to filter the services available by issue so that the salesperson only sees relevatn services
function removeLastArrayColumn(longArray) {
  longArray.forEach((row) => {
    row.pop();
    row.pop();
  });
}

function getHighestDifficultyService() {
  proposedServices.forEach((proposedService) => {
    proposedServices.forEach((row2) => {
      //find all duplicate service codes
      if(proposedService[0] === row2[0]) {
        if(proposedService[5] < row2[5]) {
          let index = proposedServices.indexOf(proposedService);
        } 
      }
    });
  });
}

//this function is used to return text field data by ID
const getValue = (elementId) => { return document.getElementById(elementId).value; }

class Form {
  constructor(name) {
    this.name = name;
    this.issues = getAllCheckedBoxes("issues[]");
    this.severity = getValue("severity");
    this.size = Number(getValue("size"));
    this.buildDate = Number(getValue("buildDate"));
    this.homeType = getValue("homeType");
    this.state = getValue("state");
  }
}

class ExistingCustomerForm extends Form {
  constructor(name) {
    super(name);
    this.service = getValue("service");
  }
 }
 
 function calcNewCustomerPrice() {
   clearErrors();
   let nc = new Form("New Customer Form");
         
    document.getElementById("proposedServiceTable").innerHTML = head;
    proposedServiceTable = '';
        
    //make sure that the customer has filled everything out
    if(nc.service == '' || nc.renewalDate == '' || nc.renewalFee == '') {
      return "error"
    }
      //Add MD to the filter out list by adding it to the issues property of wp object so that MD residents don't get mosquito offers
      proposedServices = [];
  
      //setup standardized BIM, QPC, ETC.
      calculateStandardRecurringServices(nc);

      //add mosquito focused plans
      if(nc.state === "MD" && nc.issues.includes("Mosquito")) {
        nc.issues.push("NOMD");
        createError(["We do not do mosquito treatments in Maryland!"])
      } else if(nc.state != "MD") {
        addService(moq.setPrice(0,75));
        addService(ls.setPrice(0, 75));
        addService(in2.setPrice(75,75));
      } else {}
      
     //handle one time services
     calcOneTimeServices(nc);
     proposedServices = filterArrayForArrayMatch(nc.issues,proposedServices, 8);
     proposedServices = filterArrayForNotArrayMatch(nc.issues,proposedServices, 9)
     
     logServices(proposedServices)
  
 }

//main logic that pulls data from the form, checks it for errors, runs it through if/else statements to create an array of options, calls filter fxns and then logs it to the UI
function calcWarrantyPrice() {
    clearErrors();
    let wp = new ExistingCustomerForm("Warranty Page");
    wp.renewalDate = new Date(getValue("renewalDate"));
    wp.renewalFee = Number(getValue("renewalFee"));
    wp.hadWarranty = document.querySelector('input[name="isBuilderWarranty"]:checked').value === "True" ? true : false
    

      
      document.getElementById("proposedServiceTable").innerHTML = head;
      proposedServiceTable = '';
      //create a fxn that loads their termite warranty, but with an additional fee, taken as an arugement
      const addWarranty = (extraFee) => {
        switch (wp.service) {
          case "WTR":
            addService(wtr.setPrice(extraFee, wp.renewalFee));
            break;
        case "PTR":
            addService(ptr.setPrice(extraFee, wp.renewalFee));
            break;
        case "PER":
            addService(per.setPrice(extraFee, wp.renewalFee));
            break;
        case "ANR":
            addService(anr.setPrice(extraFee, wp.renewalFee));
            break;  
        case "ATM":
            addService(atm.setPrice(extraFee, wp.renewalFee));
            break;
        case "ETM":
            addService(etm.setPrice(extraFee, wp.renewalFee));
            break;    
      
        }
      }
      
    //make sure that the customer has filled everything out
    if(wp.service == '' || wp.renewalDate == '' || wp.renewalFee == '') {
      return "error"
    }
    //Add MD to the filter out list by adding it to the issues property of wp object so that MD residents don't get mosquito offers
     
    proposedServices = [];

    //load their termite warranty with an additional fee
    if(wp.renewalDate >= daysAgo(30)) {
      addWarranty(0);
    } else if (wp.renewalDate >= daysAgo(90)){
      addWarranty(200);
    } else if (wp.renewalDate >= daysAgo(365)) {
      addWarranty(400);
    } else {

    }

    //handle people with just a termite warranty
    if(wp.service === "WTR" || wp.service === "PTR" || wp.service === "PER") {

      if(wp.renewalDate >= daysAgo(30)) {
        addService(all.setPrice(0,75));
        if(wp.state != "MD") {
          addService(allstarnewva.setPrice(0, 75));
        } else {
          addService(allstarnewmd.setPrice(0, 75));
        }
      } else {
        addService(castle.setPrice(0,75));
        if(wp.state != "MD") {
          addService(castleplusva.setPrice(0, 75));
        } else {
          addService(castleplusmd.setPrice(0, 75));
        }
      
        if(wp.renewalDate >= -90) {
          //addService(wp.service, "Reactivate " + wp.service, 100, wp.renewalFee, 1, ["Termite"], ["None"])
        }
      } 
    }

    //recurring services for people who are ANRs or EARs but we pretreated
    if((wp.service === "ANR" || wp.service === "EAR") && wp.hadWarranty && wp.renewalDate >= daysAgo(90)) {
      if(wp.severity == "Low") {
        addService(all.setPrice(0,80));
        if(wp.state === "MD") {
          addService(allstarnewmd.setPrice(0,80));
        } else {
          addService(allstarnewva.setPrice(0,80))
        }
      } else {
        addService(all.setPrice(80,80));
        if(wp.state === "MD") {
          addService(allstarnewmd.setPrice(80,80));
        } else {
          addService(allstarnewva.setPrice(80,80))
        }
      }
    }

    if((wp.service === "ANR" || wp.service === "EAR") && !wp.hadWarranty && wp.renewalDate >= daysAgo(90)) {
      if(wp.severity == "Low") {
        addService(all.setPrice(40,80));
        if(wp.state === "MD") {
          addService(allstarnewmd.setPrice(40,80));
        } else {
          addService(allstarnewva.setPrice(40,80))
        }
      } else {
        addService(all.setPrice(90,90));
        if(wp.state === "MD") {
          addService(allstarnewmd.setPrice(90,90));
        } else {
          addService(allstarnewva.setPrice(90,90))
        }
      }
    }
    //for ETMS and ATMs add All and All Stars 
    if((wp.service === "ETM" || wp.service === "ATM") && wp.renewalDate >= daysAgo(90)) {
      if(wp.severity == "Low") {
        addService(allWithTermiteMonitoring.setPrice(0,75 + (wp.renewalFee * 4/allWithTermiteMonitoring.freq)));
        addService(all.setPrice(0,80));
        if(wp.state === "MD") {
          addService(allStarMdTermiteMonitoring.setPrice(0,75 + (wp.renewalFee * 4/allStarMdTermiteMonitoring.freq)));
          addService(allstarnewmd.setPrice(0,80))
        } else {
          addService(allStarVaTermiteMonitoring.setPrice(0,75 + (wp.renewalFee * 4/allStarVaTermiteMonitoring.freq)))
          addService(allstarnewva.setPrice(0,80));
        }
        
      } else {
        addService(allWithTermiteMonitoring.setPrice(100,75 + (wp.renewalFee * 4/allWithTermiteMonitoring.freq)));
        addService(all.setPrice(80,80));
        if(wp.state === "MD") {
          addService(allStarMdTermiteMonitoring.setPrice(100,75 + (wp.renewalFee * 4/allStarMdTermiteMonitoring.freq)))
          addService(allstarnewmd.setPrice(80,80));
        } else {
          addService(allStarVaTermiteMonitoring.setPrice(100,75 + (wp.renewalFee * 4/allStarVaTermiteMonitoring.freq)));
          addService(allstarnewva.setPrice(80,80));
        }
      }
    }

    //add mosquito focused plans
    if(wp.state === "MD" && wp.issues.includes("Mosquito")) {
      wp.issues.push("NOMD");
      createError(["We don't do mosquito treatments in Maryland due to liscensing differences."])
    } else if(wp.state != "MD") {
      addService(moq.setPrice(0,75));
      addService(ls.setPrice(0, 75));
      addService(in2.setPrice(75,75));
    } else {}
    
    //add EAR upsell
    if(wp.service === "ANR" || wp.service === "WTR" || wp.service === "PER" || wp.service === "PTR") {
      addService(earbuilder.setPrice(0, wp.renewalFee + 50));
    }
    
    if(wp.service === "ATM") {
      addService(etm.setPrice(0, wp.renewalFee + 50));
    } 
    
    //handle one time services
   calcOneTimeServices(wp);
   proposedServices = filterArrayForArrayMatch(wp.issues,proposedServices, 8);
   proposedServices = filterArrayForNotArrayMatch(wp.issues,proposedServices, 9)
   
   logServices(proposedServices)
  }

function calcRecurringService() {
  clearErrors();
  let rc = new ExistingCustomerForm("Recurring Service Customer");
  rc.currentPrice = getValue("serviceFee") ;
  rc.isActive = document.querySelector('input[name="isActive"]:checked').value === "True" ? true : false;
  rc.hasTermite = document.querySelector('input[name="hasTermite"]:checked').value === "True" ? true : false;
    
  document.getElementById("proposedServiceTable").innerHTML = head;
  proposedServiceTable = '';
      //create a fxn that loads their termite warranty, but with an additional fee, taken as an arugement
      
      
    //make sure that the customer has filled everything out
    if(rc.service == '' || rc.renewalDate == '' || rc.renewalFee == '') {
      return "error"
    }
    //Add MD to the filter out list by adding it to the issues property of wp object so that MD residents don't get mosquito offers
     
    proposedServices = [];

    //setup standardized BIM, QPC, ETC.
    
      if((rc.service === "BIM" || rc.service === "QPC" || rc.service === "MOS") && rc.hasTermite) {
        addService(all.setPrice(0,85));
        console.log("ADD TERMITE")
        if(rc.state === "MD") {
          addService(allstarnewmd.setPrice(0,80));
        } else {
          addService(allstarnewva.setPrice(0,80));
        }
      }
  
  
    if(rc.severity === "High") {
      addService(etm.setPrice(150,150));
    } else if(rc.severity === "Medium") {
      addService(atm.setPrice(100, 135));
      addService(etm.setPrice(100,147.50));
    } else if(rc.severity === "Low") {
      addService(atm.setPrice(100, 130));
      addService(etm.setPrice(100,142));
    }
  
  
    if(rc.isActive) {
      if(rc.service === "QPC") {
        addService(bim.setPrice(0, rc.currentPrice - 5));
        addService(mos.setPrice(0, rc.currentPrice - 10));
      } else if (rc.service === "BIM") {
        addService(qpc.setPrice(0, rc.currentPrice + 5));
        addService(mos.setPrice(0, rc.currentPrice - 5));
      } else if (rc.service === "MOS") {
        addService(qpc.setPrice(0, rc.currentPrice + 10));
        addService(bim.setPrice(0, rc.currentPrice + 5));
      } else {  }
    } else {
      if(rc.severity = "High") {
        if(rc.size > large) {
          addService(qpc.setPrice(280,140));
          addService(bim.setPrice(150,100));
          addService(mos.setPrice(100,90));
        } else if (rc.size > medium) {
          addService(qpc.setPrice(270,135));
          addService(bim.setPrice(140,95));
          addService(mos.setPrice(95,85));
        } else if (rc.size > small) {
          addService(qpc.setPrice(260,130));
          addService(bim.setPrice(135,90));
          addService(mos.setPrice(80,80));
        } else { console.log("Please add a valid size. Should be a number above zero, representing sqr feet") }
      } else if (page.severity === "Medium") {
        if(rc.size > large) {
          addService(qpc.setPrice(270,135));
          addService(bim.setPrice(140,95));
          addService(mos.setPrice(95,85));
        } else if (rc.size > medium) {
          addService(qpc.setPrice(260,130));
          addService(bim.setPrice(135,90));
          addService(mos.setPrice(100,80));
        } else if (rc.size > small) {
          addService(qpc.setPrice(250,125));
          addService(bim.setPrice(135,85));
          addService(mos.setPrice(80,80));
        } else { console.log("Please add a valid size. Should be a number above zero, representing sqr feet") }
      } else if (rc.severity === "Low") {
        if(rc.size > large) {
          addService(qpc.setPrice(100,130));
          addService(bim.setPrice(100,90));
          addService(mos.setPrice(100,80));
        } else if (rc.size > medium) {
          addService(qpc.setPrice(100,125));
          addService(bim.setPrice(100,85));
          addService(mos.setPrice(100,80));
        } else if (rc.size > small) {
          addService(qpc.setPrice(100,120));
          addService(bim.setPrice(100,80));
          addService(mos.setPrice(100,80));
        } else { createError(["Please add a valid size. Should be a number above zero, representing sqr feet"]) }
      } else {
        console.log("Please add a valid severity factor")
      }
    }
    //add mosquito focused plans
    if(rc.state === "MD" && rc.issues.includes("Mosquito")) {
      rc.issues.push("NOMD");
      createError("We don't do termite treatments in MD")
    } else if(rc.state != "MD") {
      addService(moq.setPrice(0,75));
      addService(ls.setPrice(0, 75));
      addService(in2.setPrice(75,75));
    } else {}
    
   //handle one time services
   calcOneTimeServices(rc);
   proposedServices = filterArrayForArrayMatch(rc.issues,proposedServices, 8);
   proposedServices = filterArrayForNotArrayMatch(rc.issues,proposedServices, 9)
   
   logServices(proposedServices)
  }

function calcOneTimeServices(page) {
  if(page.homeType === "SF") {
    if(page.size > large) {
      addService(pcg.levelOne.setPrice(0, 300)); 
      addService(pcg.levelTwo.setPrice(0,375));
      addService(pcg.levelThree.setPrice(0, 580));
      addService(pcg.levelFour.setPrice(0, 850));
      if(page.severity === "Low") {
        addService(pcr.levelOne.setPrice(0, 300));
      } else if (page.severity === "Medium") {
        addService(pcr.levelTwo.setPrice(0, 450));
      } else if (page.severity === "High") {
        addService(pcr.levelThree.setPrice(0, 950));
      } else {
        console.log("Please add a severity factor");
        return;
      }
    } else if (page.size > medium) {
      addService(pcg.levelOne.setPrice(0, 250)); 
      addService(pcg.levelTwo.setPrice(0,350));
      addService(pcg.levelThree.setPrice(0, 500));
      addService(pcg.levelFour.setPrice(0, 800));
      if(page.severity === "Low") {
        addService(pcr.levelOne.setPrice(0, 275));
      } else if (page.severity === "Medium") {
        addService(pcr.levelTwo.setPrice(0, 425));
      } else if (page.severity === "High") {
        addService(pcr.levelThree.setPrice(0, 900));
      } else {
        console.log("Please add a severity factor");
        return;
      }
    } else if (page.size > small) {
      addService(pcg.levelOne.setPrice(0, 250)); 
      addService(pcg.levelTwo.setPrice(0,325));
      addService(pcg.levelThree.setPrice(0, 450));
      addService(pcg.levelFour.setPrice(0, 700));
      if(page.severity === "Low") {
        addService(pcr.levelOne.setPrice(0, 250));
      } else if (page.severity === "Medium") {
        addService(pcr.levelTwo.setPrice(0, 425));
      } else if (page.severity === "High") {
        addService(pcr.levelThree.setPrice(0, 900));
      } else {
        console.log("Please add a severity factor");
        return;
      }
    } else {
      console.log("Please add a numerical valid home size");
      return;
    }
  } else if (page.homeType === "TH") {
    if(page.size > medium) {
      addService(pcg.levelOne.setPrice(0, 250)); 
      addService(pcg.levelTwo.setPrice(0,325));
      addService(pcg.levelThree.setPrice(0, 450));
      addService(pcg.levelFour.setPrice(0, 700));
      if(page.severity === "Low") {
        addService(pcr.levelOne.setPrice(0, 250));
      } else if (page.severity === "Medium") {
        addService(pcr.levelTwo.setPrice(0, 425));
      } else if (page.severity === "High") {
        addService(pcr.levelThree.setPrice(0, 900));
      } else {
        console.log("Please add a severity factor");
        return;
      }
    } else if (page.size > small){
      addService(pcg.levelOne.setPrice(0, 250)); 
      addService(pcg.levelTwo.setPrice(0,300));
      addService(pcg.levelThree.setPrice(0, 420));
      addService(pcg.levelFour.setPrice(0, 650));
      if(page.severity === "Low") {
        addService(pcr.levelOne.setPrice(0, 250));
      } else if (page.severity === "Medium") {
        addService(pcr.levelTwo.setPrice(0, 400));
      } else if (page.severity === "High") {
        addService(pcr.levelThree.setPrice(0, 850));
      } else {
        console.log("Please add a severity factor");
        return;
      }
    } else {
      console.log("Please add a numerical valid home size");
    }
  } else {
    console.log("No home type listed");
    return;
  }

  if(page.state === "VA" && page.buildDate > 1980 && page.severity === "Low") {
    addService(pct.levelOne.setPrice(0, 150));
  } else if(page.severity === "Medium") {
    if(page.size > 2000) {
      addService(pct.levelTwo.setPrice(0, 1000));
    } else {
      addService(pct.levelTwo.setPrice(0, 800));
    }
  } else {
    addService(pct.levelThree.setPrice(0, page.size * 1.05));
    
  }
}

function calculateStandardRecurringServices(page) {
  if(page.severity = "High") {
    if(page.size > large) {
      addService(qpc.setPrice(280,140));
      addService(bim.setPrice(150,100));
      addService(mos.setPrice(100,90));
    } else if (page.size > medium) {
      addService(qpc.setPrice(270,135));
      addService(bim.setPrice(140,95));
      addService(mos.setPrice(95,85));
    } else if (page.size > small) {
      addService(qpc.setPrice(260,130));
      addService(bim.setPrice(135,90));
      addService(mos.setPrice(80,80));
    } else { console.log("Please add a valid size. Should be a number above zero, representing sqr feet") }
  } else if (page.severity === "Medium") {
    if(page.size > large) {
      addService(qpc.setPrice(270,135));
      addService(bim.setPrice(140,95));
      addService(mos.setPrice(95,85));
    } else if (page.size > medium) {
      addService(qpc.setPrice(260,130));
      addService(bim.setPrice(135,90));
      addService(mos.setPrice(100,80));
    } else if (page.size > small) {
      addService(qpc.setPrice(250,125));
      addService(bim.setPrice(135,85));
      addService(mos.setPrice(80,80));
    } else { console.log("Please add a valid size. Should be a number above zero, representing sqr feet") }
  } else if (rc.severity === "Low") {
    if(page.size > large) {
      addService(qpc.setPrice(100,130));
      addService(bim.setPrice(100,90));
      addService(mos.setPrice(100,80));
    } else if (page.size > medium) {
      addService(qpc.setPrice(100,125));
      addService(bim.setPrice(100,85));
      addService(mos.setPrice(100,80));
    } else if (page.size > small) {
      addService(qpc.setPrice(100,120));
      addService(bim.setPrice(100,80));
      addService(mos.setPrice(100,80));
    } else { console.log("Please add a valid size. Should be a number above zero, representing sqr feet") }
  } else {
    console.log("Please add a valid severity factor")
  }

  if(page.severity === "High") {
    addService(etm.setPrice(150,150));
  } else if(page.severity === "Medium") {
    addService(atm.setPrice(100, 135));
    addService(etm.setPrice(100,147.50));
  } else if(page.severity === "Low") {
    addService(atm.setPrice(100, 130));
    addService(etm.setPrice(100,142));
  }
}


function createError(errorList) {

  let errorText = `<ul class="errorList">`
  errorList.forEach((error) => {
    errorText += `<li class="errorListBullet">${error}</li>`
  })


  errorText += "</ul>"

  document.getElementById("errorContainer").innerHTML = `<div class="errorRow"><h3>There was an issue processing your request. Please see the errors below and fix them. Then click, calculate again. </h3><br> ${errorText}</div>`
  kill = true;

}

function clearErrors() {
  document.getElementById("errorContainer").innerHTML = "";
  kill = false;
}


//create the map

/** 
// Initialize and add the map
function initMap(latCoordinate, longCoordinate) {
  // The location of Uluru
  if(latCoordinate === undefined || longCoordinate === undefined) {
    const address = {lat: 38.806, lng: -77.075}
  } else {
    const address = {lat: latCoordinate, lng: longCoordinate}
  }

  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: address,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: address,
    map: map,
  });
}



function findAddress() {
  initMap(10, 2)
}

*/