function bookSearch(){
	var search = document.getElementById('search').value

	if (search == '') {
		$("#result").empty();
	}
	else{
		document.getElementById('result').innerHTML = " "
		console.log(search)

		var url = '';
		var img = '';
		var title = '';
		var btn='';
		var fav='';
		var id_book='';

		$.ajax({
			url: "https://www.googleapis.com/books/v1/volumes?q=" + search + "&printType=books&maxResults=10&key=AIzaSyBScqv6RmGB8RMPqJ1i76c8QTVoQKF9zIs",
			dataType: "json",
			success: function(data){
				for(i=0; i<data.items.length; i++){
					id_book=data.items[i].id;
					fav=$('<a href= "/'+id_book+'" onclick="add()"><span class="dot" title="add book"><i class="fas fa-heart"></i></span></a>');
					title=$("<center><h2>" + data.items[i].volumeInfo.title + "</h2></center>");
					title.appendTo("#result");
					url=data.items[i].volumeInfo.imageLinks.thumbnail;
					img=$('<a href= "book_features/'+id_book+'"><img src='+url+'></a>');
					
					img.appendTo("#result");
					fav.appendTo("#result");
				}
				btn=$("<br><a href='#intro'><button onclick='remove_search()'>Remove</button></a>");
				btn.appendTo("#result");
			},
			type: 'GET'
		});
	}
}

function remove_search(){
	$("#result").empty();
}

document.getElementById('search').addEventListener('change', bookSearch,false)
