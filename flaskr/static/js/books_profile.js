function books_profile(a){

	var img = '';
	var url='';
	var fav='';
	var search=a;

	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&printType=books&key=AIzaSyBScqv6RmGB8RMPqJ1i76c8QTVoQKF9zIs",
		dataType: "json",

		success: function(data){
			for(i=0; i<data.items.length; i++){
				if (data.items[i].id==search) {
					fav=$('<a href= "/r/'+search+'"><span class="dot" title="remove book"><i class="fas fa-trash-alt"></i></span></a>');
					url=data.items[i].volumeInfo.imageLinks.thumbnail;
					img=$('<a href= "book_features/'+search+'"><img src='+url+'></a>');
					
					img.appendTo(array_book);
					fav.appendTo(array_book);
				}			
			}
		},
		type: 'GET'
	});
	
	return null;
	
}

var b = document.getElementById('a_b').innerText;
var ris = b.split('"');

var space=0;
for(var i=0;i<=ris.length-1;i++){
	space=ris[i].length;
	if(space>3){
		document.getElementById('array_book').innerHTML=books_profile(ris[i]);
	}
}





