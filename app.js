//Дэлгэцтэй ажиллах контроллер
var uiController = (function(){

    var DOMStrings ={
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    };

    return{
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },
        getDOMstring: function(){
            return DOMStrings;
        }
    };
   
})();

//Санхүүтэй ажиллах контроллер
var financeController = (function(){
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },

        totals:{
            inc:0,
            exp
        }
    }

})();

//Програмын холбогч контроллер
var appController = (function(uiController, financeController){

    var ctrlAddItem = function() {
        //1. Оруулах өгөгдлийн бэлдэцээс олж авна.
        console.log(uiController.getInput());


        //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.


        //3. Олж авсан өгөгдлүүдээ веө дээрээ тохирох хэсэгт нь гаргана.



        //4. Төсвийг тооцоолно.
        


        //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.



    }

   var setupEventListeners = function(){

    var DOM = uiController.getDOMstring();

    document.querySelector(DOM.addBtn).addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener("keypress", function(event){
        if(event.keyCode === 13 || event.which === 13 ){
            ctrlAddItem();        
        };
        // console.log(event);
    });
   }

   return{
    init: function(){
        console.log("Application started...");
        setupEventListeners();
    }
   };

})(uiController,financeController);

appController.init();