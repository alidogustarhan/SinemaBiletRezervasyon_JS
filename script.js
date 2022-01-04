const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved');
//2//Bu noktada seçtiğimiz koltukların ve filmin sayfa yenilenince de seçili kalmasını istediğimizden dolayı local storage kulanacağız.Bu üstteki seats ı da o yüzden seçtik.

getFromLS();
calculateTotal();

container.addEventListener('click', function(e) {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) { 
       
    // bu if komutu ile click yaptığımız eleman için kısıtlama yaparak
    // sadece hedef elemanımız için komutun çalışmasını sağladık.
       e.target.classList.toggle('selected');
       //TOGGLE kullanmamızın yararı çift tıklama işlemine duyarlı olmasıdır.
       //yani eğer eleman selected class ını içeriyorsa ona tıklarsak o class ı kaldırır.Bunu TOGGLE kullanmamıza borçluyuz. 
       calculateTotal()      
    }
});

select.addEventListener('change', function(e) {
     // MOVİE SEÇİM KUTUSUNDA DEĞİŞİKLİK YAPINCA ÜCRETİ 
    // YENİDEN HESAPLAMASI İÇİN  BUNU
    calculateTotal(); 
    
    
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    //2//Local storage için yukarda genel bir eleman seçimi yaptık.
    //Burada ise tıklanan koltukların seçimini yaptık. Local storgaeyi şu şekilde uygulayacağız. Tüm koltuklar içerisinde seçtiğimiz koltukların index numarası ne ise onu programın aklında tutmasını sağlayacağız.Bunun için map metodu kullanacağız.Ancak map metodu yalnızca liste içerisinde kullanılabildiği için bu bilgileri liste içerisinde tutmalıyız.
    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat)
    {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });
        //2//LİSTE OLUŞTURDUK VE ELEMANLARI LİSTEYE PUSH METODUYLA YAZDIK.
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat)
    {
        return seatsArr.indexOf(seat);
        //2//BURADA İSE YUKARDA İSTEDİĞİMİZ SEÇİLEN ELEMANIN KAÇ NUMARALI INDEX OLDUGUNU OGRENEBILMEK ICIN GEREKLI KODU YAZDIK. BU BİLGİ ARTIK selectedSeatIndexs içerisinde saklanacak.
    });

    

    let selectedSeatCount = selectedSeats.length;
    let price = select.value;
    count.innerText = selectedSeatCount ;
    amount.innerText = selectedSeatCount  * price;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLS(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedSeats != null && selectedSeats.length >0){
        seats.forEach(function(seat,index)
        {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}