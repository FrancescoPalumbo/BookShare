function bookSearch(id,a,n){

	var img = '';
	var title = '';
	var url='';
	var aut='';
	var fav='';
	var id_book='';

	var num=n;
	var search=a;
	var id=id;

	if (num==1) {
		$.ajax({
			url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "+inauthor&printType=books&maxResults=6&key=AIzaSyBScqv6RmGB8RMPqJ1i76c8QTVoQKF9zIs",
			dataType: "json",

			success: function(data){
				for(i=0; i<data.items.length; i++){
					id_book=data.items[i].id;
					fav=$('<a href= "/'+id_book+'" onclick="add();"><span class="dot" title="add book"><i class="fas fa-heart"></i></span></a>');
					url=data.items[i].volumeInfo.imageLinks.thumbnail;
					img=$('<a href= "book_features/'+id_book+'"><img src='+url+'></a>');
					
					img.appendTo(id);
					fav.appendTo(id);
				}
			},
			type: 'GET'
		});
		return null;
	}
	else{
		$.ajax({
			url: "https://www.googleapis.com/books/v1/volumes?q='" + search + "'+inpublisher&orderBy=newest&printType=books&maxResults=6&key=AIzaSyBScqv6RmGB8RMPqJ1i76c8QTVoQKF9zIs",
			dataType: "json",

			success: function(data){
				for(i=0; i<data.items.length; i++){
					id_book=data.items[i].id;
					fav=$('<a href= "/'+id_book+'" onclick="add()"><span class="dot" title="add book"><i class="fas fa-heart"></i></span></a>');
					url=data.items[i].volumeInfo.imageLinks.thumbnail;
					img=$('<a href= "book_features/'+id_book+'"><img src='+url+'></a>');
					
					img.appendTo(id);
					fav.appendTo(id);
				}
			},
			type: 'GET'
		});
	return null;
	}
}

document.getElementById('bookshelf_1').innerHTML=bookSearch("#bookshelf_1",document.getElementById('kind_book').innerText,1);
document.getElementById('bookshelf_2').innerHTML=bookSearch("#bookshelf_2",'hawking',1);
document.getElementById('bookshelf_3').innerHTML=bookSearch("#bookshelf_3",'computer',2);