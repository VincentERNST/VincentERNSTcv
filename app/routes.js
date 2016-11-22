var Enigma = require('./models/Enigma');
var nodemailer = require('nodemailer');
var hash = require ('./mapping/qHash');
var map = require ('./mapping/mappingAnswer'); 

var defaut=[
' Je comprends rien, pouvez être plus clair svp?',
' Joker sur cette question',
' Euuuueehhh...',
' Pardon, le génie ne trouve pas de réponse',
' Aucune réponse trouvée, vous pouvez tenter de reformuler la question'
];
var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

    module.exports = function(app) {



      //get anwer hash and response
      app.get('/api/answers/:q', function(req, res) {
          var q = req.params.q;
          console.log('je te passe q : '+q);
          q=hash(q);
          console.log('q hashe : '+q);
          if(q == 'default'){
            q=defaut[getRandomInt(0,4)];
          }
          else{
              q=map.get(q);
              console.log('je t en ! '+q);   
          }   
          res.send(q);  
      });  

//anti SPAM
      app.get('/api/enigmasInRange/:d', function(req, res) {
          var delta = req.params.d;
          var date = Date.now();
          var t= date-delta;
          
            Enigma.count({ create_date : {$gte : t} },function(err, count) {
                if (err){     
                    res.send(err);
                }
                else{          
                  console.log('find ok durée de test: '+date+ ' delta : '+delta+' date de début: '+t);
                  //var range = enigmas.length;
                  console.log('Il y avait '+count+'sur cette période c\'est cool');
                  res.json(count);
                }
          }); 
      });

        // get all
        app.get('/api/enigmas', function(req, res) {
            Enigma.find(function(err, enigmas) {
                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err){     
                	res.send(err);
                }
                else{
                	//console.log('cool*'+ clients);
                	res.json(enigmas);// return all nerds in JSON format
            	}
            });
        });

        //get one by id
        app.get('/api/enigmas/:id', function(req, res) {
        	var id = req.params.id;
            Enigma.findById(id,function(err, enigma) {
                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err){     
                	res.send(err);
                }
                else{
                	res.json(enigma);// return all nerds in JSON format
            	}
            });
        });  
        app.post('/api/enigmas', function(req, res) {
            var question = req.param("question");
            var answer = req.param("answer");
            var mail = req.param("mail");
            var create_date = req.param("create_date"); 
			var f = function(){
                Enigma.create({question : question , answer : answer, mail : mail, create_date : create_date } , function(err,enigma){
    				//console.log('cool+'+client);
    				res.json(enigma);
    			});
            }
            setTimeout(f, 6000);            
        });
        //mail sender route
        app.post('/api/mail',function(req, res) {
            var transporter = nodemailer.createTransport('smtps://jc.dusse.ernst%40gmail.com:go4peace@smtp.gmail.com');
            var subject = '[cv app] '+req.param("contactSubject");
            var email = req.param("contactEmail");
            var body = req.param("contactMsg"); 
            var mailOptions = {
                //from: email, // sender address
                to: 'ernst.vincent@live.fr', // list of receivers
                subject: subject, // Subject line
                text: 'De '+email+' '+body, // plaintext body
                //html: '<b>Hello world </b>' // html body
            };
              // send mail with defined transport object
         transporter.sendMail(mailOptions, function(error, info){
             if(error){
                 return console.log(error);
             }
             console.log('Message sent: ' + info.response);
             res.json(info);
         });
              
        });        
        app.delete('/api/enigmas/:id',function(req,res){
        	var id = req.params.id;
            var f = function(){
                Enigma.findByIdAndRemove(id,function(err,enigma){
                res.json(enigma);
                console.log('c ok suppression')
                })
            }

        }); 
        app.put('/api/enigmas/:id',function(req,res){
        	var id = req.params.id;
        	var question = req.param("question");
			var answer = req.param("answer");
            var mail = req.param("mail");
            var create_date = req.param("create_date");            
        	Enigma.findByIdAndUpdate (id,{question : question , answer : answer, mail : mail, create_date : create_date },function(err,enigma){
        		res.json(enigma);
        	})
        });                     

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};