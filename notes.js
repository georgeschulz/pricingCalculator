/**
 * - Includes inside treatment when exterior doesn’t work
- Includes exterior treatment
- Includes termite monitoring
- Warranty that covers cost to remove termites 
- Visits 
- Cost of callback
- Pest control included
- Rodent Control Included
- Termites included
    - $200 voucher towards treatment to remove any termites found
    - 
- Made for new homes
- Service to remove the issue
- Includes warranty on treatment 
- Premise-G
- Mosquito treatment included
    - Backpack sprayer
    - In2care
- Annual termite inspection by one of our expert technician
- Tick treatment with a granular application
 * 
 * 
 * 
 * 
 * 
 * 
 */

this.freq    // number
this.pest   // bool
this.rodent // bool
this.termite  // number 0-2 (2 is full treat, 1 is $200 voucher, 0 is none)
this.interior //bool
this.exterior //bool
this.monitor //bool
this.warranty //number value representing days under warranty
this.callback //number value representing ocst of callbacks
this.newHome //bool
this.termiteWarranty //bool
this.premise
this.mosquito //3= backpack + granular, 2= in2, 1= backpack, 0=none
this.inspection //bool
this.tick //bool



serviceFeature(); //all return

this.pest = false;   // bool
this.rodent = false;  // bool
this.premise = false;
this.mosquito  = false; //3= backpack + granular, 2= in2, 1= backpack, 0=none

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
  