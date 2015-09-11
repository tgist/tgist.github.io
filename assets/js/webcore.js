(function($){

  /* links */
  $(document).ready(function() {
    $('a[href]').each(function() {
      if (this.href.indexOf(window.location.host) == -1) $(this).attr({target: '_blank' });
    });
  });

})(jQuery);
