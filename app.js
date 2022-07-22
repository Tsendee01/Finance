//Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
    var x = 12;
    console.log("hello");
})();

//Санхүүтэй ажиллах контроллер
var financeController = (function(){
    var y = 7;
    console.log("helloofinance");
})();

//Програмын холбогч контроллер
var appController = (function(uiController, financeController){

    var ctrlAddItem = function() {
        //1. Оруулах өгөгдлийн бэлдэцээс олж авна.
        console.log("12345");


        //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.


        //3. Олж авсан өгөгдлүүдээ веө дээрээ тохирох хэсэгт нь гаргана.



        //4. Төсвийг тооцоолно.
        


        //5.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.



    }

    document.querySelector('.add__btn').addEventListener('click', function(){
        
    });

    document.addEventListener("keypress", function(event){
        if(event.keyCode === 13 || event.which === 13 ){
            ctrlAddItem();        
        };
        // console.log(event);
    });

})(
    uiController,
    financeController
)