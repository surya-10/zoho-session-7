class Taxi{
    constructor(i){
        this.id=i;
        this.location="A";
        this.available=true;
        this.earnings=0;
    }
    isAvailable(){
        return this.available;
    }
    moveTo(point){
        this.location=point;
    }
    addEarnings(amount){
        this.earnings=amount;
    }
    print(){
        return `Taxi Taxi ID: ${this.id} || Location: ${this.location} || Earnings: ${this.earnings} || Availabilty: ${this.available}`;
    }
}

class Booking{
    constructor(customerId, pickup, drop, assignedTaxi){
        this.customerId=customerId;
        this.pickup=pickup;
        this.drop=drop;
        this.assignedTaxi=assignedTaxi;
    }
}

class TaxiBooking{
    constructor(n){
        this.taxis = [];
        for(let i=1; i<=n; i++){
            this.taxis.push(new Taxi(i));
        }
        this.points=["A", "B", "C", "D", "E", "F"];
        this.distanceBetweenTwoPoints=15;
    }
    findNearestTaxi(pickup){
        let availableTax = this.taxis.filter((taxi)=>taxi.isAvailable());
        if(availableTax.length==0){
            return null;
        }
        let minDistance = Infinity;
        let myTaxi = null;
        for(let taxi of availableTax){
            let distance = Math.abs(this.points.indexOf(taxi.location)-this.points.indexOf(pickup));
            if(distance<minDistance){
                minDistance=distance;
                myTaxi=taxi;
            }
            else if(minDistance==distance && taxi.earnings<myTaxi.earnings){
                myTaxi=taxi;
            }
        }
        return myTaxi;
    }
    calculateFare(pickup, drop){
        let distance = Math.abs(this.points.indexOf(drop)-this.points.indexOf(pickup))*this.distanceBetweenTwoPoints;
        let fare = 0;
        if(distance<=5){
            fare=100;
        }
        else{
            let baseFare = 100;
            let additionalDistance = distance - 5;
            let additionalFare = additionalDistance * 10;
            fare = baseFare + additionalFare;
        }
        return fare;
    }
    bookTaxi(customerId, pickup, drop){
        let nearestTaxi = this.findNearestTaxi(pickup);
        if(!nearestTaxi){
            console.log("no taxi available");
            return;
        }
        let amount = this.calculateFare(pickup, drop)
        nearestTaxi.moveTo(drop);
        nearestTaxi.earnings=amount;
        nearestTaxi.available=false;
        let booking = new Booking(customerId, pickup, drop, nearestTaxi.id);
        console.log(`Taxi booked, ${booking.customerId} || Taxi: ${booking.assignedTaxi} || Amount ${amount}`);
        return booking;
    }
    printTaxis() {
        this.taxis.forEach(taxi => {
            console.log(taxi.print());
        });
    }
}
let taxiManager = new TaxiBooking(4);
console.log(taxiManager);
taxiManager.bookTaxi("customer-01", "A", "E");
taxiManager.bookTaxi("customer-01", "A", "E");
taxiManager.bookTaxi("customer-01", "A", "E");
taxiManager.bookTaxi("customer-01", "A", "E");
taxiManager.bookTaxi("customer-01", "A", "E");
taxiManager.printTaxis()