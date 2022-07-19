 var link = location.href.substr(location.href.lastIndexOf('/') + 1);
 var indx = link.indexOf('#');
 var sectionName = indx > -1 ? link.substr(indx + 1) : "";

 // mark in bold current item and scroll in the center
 function hiliteTOCElement(section) {
   var oldItem = document.querySelector('#TOC ul li a.tocCurrentItem');
   if (oldItem) oldItem.classList.remove("tocCurrentItem");
   
   var curItem = document.querySelector('#TOC ul li a[href="#' + section + '"]');
   if (curItem) {
     curItem.classList.add("tocCurrentItem");
     curItem.scrollIntoView({block: 'center'});
   }
   
   if (history.pushState) {
     history.pushState(null, null, '#' + section);
   }
 }

 hiliteTOCElement(sectionName);
  
 // find absolute position of an element
 function absTop(element) {
    var top = 0;
    do {
        top += element.offsetTop  || 0;
        element = element.offsetParent;
    } while(element);

    return top;
 }

 var anchorPositions = {};
 // refresh to update positions on images load and window resize
 setInterval(function() {
   document.querySelectorAll('h2[id],h3[id]').forEach(function(a) {
     // the link is SECTION and there is a reference in TOC
     if (document.querySelector('#TOC > ul > li a[href="#' + a.id + '"], #TOC > ul > li > ul > li a[href="#' + a.id + '"]')) {
       anchorPositions[a.id] = absTop(a);
     }
   });
 }, 10*1000);
 
 document.addEventListener("scroll", function(){
   var top = document.documentElement.scrollTop + 10; // +10 to make sure the same section is active when we click on it

console.log("!!! top", top);   
   var dist = null;
   var closest = "";
   Object.keys(anchorPositions).forEach(function(id) {
     if (dist === null || (0 < top - anchorPositions[id] && top - anchorPositions[id] < dist)) {
       dist = top - anchorPositions[id];
       closest = id;
     }
   });
   console.log("!!!", closest);
   hiliteTOCElement(closest);
 });
