(function (root) {
    
    var $			= root.$,
		hash		= root.location.hash,
		$content	= $('#_main_content_'),
		Backbone	= root.Backbone,
		loading		= false,
		router;

    var empty = function (a) {
        return undefined === a || a === null || a === "" || a === "0" || a === 0 || (("object" === typeof a || "array" === typeof a) && a.length === 0);
    };

	
	var loadingAnimation = function(){
		var $loading = $('#loading');
		
		loading = true;
		$('#myCarousel').carousel('pause');
		
		root.onresize = function(){
			$loading.css({'left' : (window.innerWidth/2) - ($loading.width()/2), 'top' : (window.innerHeight/2)-($loading.height()/2) - 70}).fadeIn();
			$('#loading-title').fadeIn('slow').css('padding-top', $loading[0].offsetTop + 350);
			$('#loading-wrapper').css({'width' : window.innerWidth, 'height' : window.innerHeight + 10, 'top' : 0, 'left' : 0});
		};
		
		root.onresize();
		
		$('html').css('overflow','hidden');
	};
	

	
	var $menu = $('.menu'),
		toggler = 0;
	
	$(document).keydown(function(e){
		if(e.keyCode == 18 && !toggler){
			$menu.tooltip('show');
			toggler = 1;
		}
	});
	
	$(document).keyup(function(e){
		$menu.tooltip('hide');
		toggler = 0;
	});

	setTimeout(function(){
		loading = false;
		$('#loading, #loading-wrapper').fadeOut(3000, function(){
			$(this).remove();
			$('html').css('overflow','auto');
		});
		$('#myCarousel').carousel('cycle');
	}, 5000);
	

	var AppRouter = Backbone.Router.extend({
		routes: {
			'about'					: 'aboutPage',
			'news'					: 'newsPage',
			'events'				: 'eventsPage',
			'news/:object_id'		: 'newPage',
			'programs'				: 'programsPage',
			'event/:object_id'		: 'eventPage',
			'program/:object_id'	: 'programPage',
			'*actions'				: 'indexPage'
		},
		initialize : function(){},
		indexPage : function(){
			$content.html($('#home-template').html());
			location.hash = href = 'home';
			$('li.active').removeClass('active');
			$('#home-li').addClass('active');
			if(!loading){
				$('#myCarousel').carousel('cycle');
			}
		},
		programsPage : function(){
			$content.html($('#programs-browse-template').html());
			$('li.active').removeClass('active');
			$('#causes-li').addClass('active');
			root.scrollTo(0);
		},
		eventsPage : function(){
			$content.html($('#events-browse-template').html());
			$('li.active').removeClass('active');
			$('#events-li').addClass('active');
			root.scrollTo(0);
		},
		newsPage : function(){
			$content.html($('#news-browse-template').html());
			$('li.active').removeClass('active');
			$('#news-li').addClass('active');
			root.scrollTo(0);
		},
		programPage : function(){
			$content.html($('#program-template').html());
			$('li.active').removeClass('active');
			$('#causes-li').addClass('active');
			root.scrollTo(0);
		},
		eventPage : function(){
			$content.html($('#event-template').html());
			$('li.active').removeClass('active');
			$('#events-li').addClass('active');
			root.scrollTo(0);
		},
		newPage : function(){
			$content.html($('#news-template').html());
			$('li.active').removeClass('active');
			$('#news-li').addClass('active');
			root.scrollTo(0);
		},
		aboutPage : function(){
			$content.html($('#about-template').html());
			$('li.active').removeClass('active');
			$('#about-li').addClass('active');
			root.scrollTo(0);
		}
	});

	
	(function(tmpls){
		var $templates = $('#templates'),
			load = Function.prototype;

		loadingAnimation();
        load = function(i){
			if(i == tmpls.length){
				router = new AppRouter();
				Backbone.history.start();
				return;
			}
            $.get('tmpl/' + tmpls[i] + '.html', function (data) {
                $templates.append(data);
				load(i+1);
            });
        };
		load(0);
    })(['event','events_browse','home','program','programs_browse','news','news_browse','about']);
	
}(this));
