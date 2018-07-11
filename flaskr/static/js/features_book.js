function bookSearch(cover,title_b, author_b, description_b, pub_date_b, a){

	var img = '';
	var title = '';
	var url='';
	var aut='';
	var desc='';
	var p_d='';
	var fav='';

	var search=a;
	var cover_book=cover;
	var title_book=title_b;
	var author_book=author_b;
	var description_book=description_b;
	var pub_date_book = pub_date_b;

	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&printType=books&key=AIzaSyBScqv6RmGB8RMPqJ1i76c8QTVoQKF9zIs",
		dataType: "json",

		success: function(data){
			for(i=0; i<data.items.length; i++){
				if (data.items[i].id==search) {
					fav=$('<a href= "/'+search+'" onclick="add()"><span class="dot" title="add book"><i class="fas fa-heart"></i></span></a>');
					url=data.items[i].volumeInfo.imageLinks.thumbnail;
					img=$('<a href= "#"><img src='+url+'></a>');
					title=$("<h2>" + data.items[i].volumeInfo.title + "</h2>");
					aut=$("<h5>" + data.items[i].volumeInfo.authors + "</h5>");
					desc=data.items[i].volumeInfo.description;
					if (desc == 'undefined' || desc == null) {
						desc=$("<p style='text-align: justify'>No description.</p>");
					}
					else{
						desc=$("<p style='text-align: justify'><b>Description:</b> " + desc + "</p>");
					}
					p_d=$("<h6>" + data.items[i].volumeInfo.publisher + " || " +data.items[i].volumeInfo.publishedDate+ "</h6>");
					
					title.appendTo(title_book);
					aut.appendTo(author_book);
					desc.appendTo(description_book);
					p_d.appendTo(pub_date_book);
					img.appendTo(cover_book);
					fav.appendTo(cover_book);
				}
			}
		},
		type: 'GET'
	});
	return null;
}

var pathname = window.location.pathname;
var ris = pathname.split('/');

document.getElementById('cover').innerHTML=bookSearch("#cover","#title_book", "#author", "#description", "#pub_date", ris[2]);