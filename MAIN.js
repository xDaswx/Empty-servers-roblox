(function() {
   const gid = Number(window.location.pathname.split('/')[2]) || Number(prompt('Game ID to join:', '301549746'));
   const url = `https://www.roblox.com/games/${gid}`;

   const searchForGame = function(gid, min, max) {
       var page = Math.round((max + min) / 2);
       fetch(`https://www.roblox.com/games/getgameinstancesjson?placeId=${gid}&startindex=${page}`)
       .then((resp) => resp.json())
       .then(function(data) {
           if (data['Collection'].length < 10 && data['Collection'].length > 0) {
               var server = data['Collection'][data['Collection'].length - 1];
               console.log('Found empty server:', server, '\nCurrent Total Players:', server['CurrentPlayers'].length);
               try {
                   eval(server['JoinScript']);
               } catch(e) {
                   console.log('Error:', e);
               }
               return true;
           } else if (data['Collection'].length == 0) {
               max = page;
               console.log('Page empty, trying new page:', page);
               searchForGame(gid, min, max);
           } else {
               min = page;
               console.log('Not empty, trying new server:', page);
               searchForGame(gid, min, max);
           }
       })
   }
   searchForGame(gid, 0, 10000);
})();
