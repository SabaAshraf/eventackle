$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});

});
$(document).ready(function(){
    $('.image-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 7000,
        responsive: [
            {
                breakpoint: 991.99,
               settings: {
                   slidesToShow: 4
                   
                  }
           },
           {
               breakpoint: 575.99,
               settings:{
                   slidesToShow: 4
                   
               }
           },
           {
               breakpoint: 479.99,
               settings:{
                   slidesToShow: 2
                   
                   
               }
           }
        ]
    });
  
});
// For consuming the API's and filtering out Posts

var postStatus = [];
var postDate =[];
var data=[];

$(document).ready(function(){
    var postWrapper = document.getElementById('postsWrapper');
    var request = new XMLHttpRequest();
    request.open('GET', 'https://my-json-server.typicode.com/orzel-bielik/test/posts', true);
    request.onload = function () {

         data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(blog => {
            addfun(blog);
            var iDate=blog.date;
            if ($.inArray(iDate, postDate) == -1) {
            postDate.push(iDate);
            $("#dropDown_date").append('<option value="' + iDate + '">' + iDate + '</option>');
            }
            var iStatus=blog.status;
            if ($.inArray(iStatus, postStatus) == -1) {
            postStatus.push(iStatus);
            $("#dropDown_status").append('<option value="' + iStatus + '">' + iStatus + '</option>');
            }
             
          });
          
        } else {
          var errorMessage = document.createElement('div');
          errorMessage.textContent = 'OOPS! No posts found';
          postWrapper.appendChild(errorMessage);
        }
      };
      request.send();

  $("#dropDown_status").change(function() {
     console.log("hello");
     $("#postsWrapper").find("tr:gt(0)").remove();
       var issetdate=$('#dropDown_date').val();
       var issetstatus=$('#dropDown_status').val();
       data.forEach(blog => {
        if(issetstatus == 'status' && issetdate == 'date' )
        {
          addfun(blog);
        }
       else if(issetdate != 'date' ){
          if(blog.status == $('#dropDown_status').val() && blog.date == $('#dropDown_date').val())
          {
            addfun(blog);
          }

        }else if (blog.status == $('#dropDown_status').val() ){
               addfun(blog);
             }
      });
  });




   $("#dropDown_date").change(function() {
     var issetstatus=$('#dropDown_status').val();
     $("#postsWrapper").find("tr:gt(0)").remove();
       console.log(data);
       var issetdate=$('#dropDown_date').val();

      data.forEach(blog => {
         if(issetstatus == 'status' && issetdate == 'date' )
        {
          addfun(blog);
        }
        else if(issetstatus != 'status' ){
          if(blog.status == $('#dropDown_status').val() && blog.date == $('#dropDown_date').val())
          {
            addfun(blog);
          }
        } 
      else if (blog.date == $('#dropDown_date').val() ){
             addfun(blog);
             }
      });
  });


    function addfun(blog){
      var tblBody = document.createElement("tbody");
        var tableRow = document.createElement('tr');
        
        tblBody.appendChild(tableRow);

        var blogDate = document.createElement('td');
        blogDate.textContent = blog.date;
        console.log(blog.status);
           var blogTitle = document.createElement('td');
        blogTitle.textContent = blog.title;
  
        var blogStatus = document.createElement('td');
        blogStatus.textContent = blog.status;
        postWrapper.appendChild(tableRow);
        tableRow.appendChild(blogDate);
        tableRow.appendChild(blogTitle);
        tableRow.appendChild(blogStatus);
    }

});


