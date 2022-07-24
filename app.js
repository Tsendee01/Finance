//Дэлгэцтэй ажиллах контроллер
var uiController = (function(){

    var DOMStrings ={
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expensesList: ".expenses__list "
    };

    return{
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        getDOMstring: function(){
            return DOMStrings;
        },

        clearfields: function(){
            var fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            //convert List to array
            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el, index, array){
                el.value = "";
            });
            // for(var i = 0; i < fieldsArr.length; i++)
            // {
            //     fieldsArr[i].value = "";
            // }

            fieldsArr[0].focus();
        },

        addListItem: function(item, type){
            // Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ.
            var html, list;

            if (type === 'inc') {
                list = DOMStrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMStrings.expensesList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // //Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.

            html = html.replace('%id%', item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", item.value);
            // // Бэлтгэсэн HTML ээ DOM руу хийж өгнө. 

            document.querySelector(list).insertAdjacentHTML("beforeend", html);
    
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
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.items[type].forEach(function(el){
            sum = sum + el.value;
        })

        data.totals[type] = sum;
    };

    var data = {
        items: {

            inc: [],
            exp: []
        },

        totals:{
            inc: 0,
            exp: 0
        },

        tusuv: 0,
        huvi: 0

    };

    return{
        tusuvTootsooloh: function(){
            // Нийт орлогын нийлбэрийг тооцоолно.
            calculateTotal('inc');
            //Нийт зарлагын нийлбэрийг тооцоолно.
            calculateTotal('exp');
            // Төсвийг шинээр тодорхойлно.
            data.tusuv = data.totals.inc - data.totals.exp;
            // Орлого зарлагын хувийг тооцооолно.

            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);

        },
        tusviigAvah: function(){
            return{
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        addItem: function(type, desc, val){
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else{
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type == 'inc'){
                item = new Income(id, desc, val);
            }else{
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);

            return item;
        },
        seeData: function(){
            return data;
        }
    }

})();

//Програмын холбогч контроллер
var appController = (function(uiController, financeController){

    var ctrlAddItem = function() {
        //1. Оруулах өгөгдлийн бэлдэцээс олж авна.
        var input = uiController.getInput();
        if(input.description !== "" && input.value !== ""){
            //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
            var item = financeController.addItem(input.type, input.description, input.value);

            //3. Олж авсан өгөгдлүүдээ веө дээрээ тохирох хэсэгт нь гаргана.

            uiController.addListItem(item, input.type);
            uiController.clearfields();

            //4. Төсвийг тооцоолно.
            
            financeController.tusuvTootsooloh();


            //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
            var tusuv = financeController.tusviigAvah();

            //Төсөвийн тооцоог дэлгэцэнд гаргана.


        }
        
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