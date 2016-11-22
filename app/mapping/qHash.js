var qHash = function(s){

	if(/dispo|calendrier|temps|quand/i.test(s)){return 'dispo';}
	if(/nutrition|mang|banane|aliment|bouffe/i.test(s)){return 'mange';}
	if(/formation|éducation/i.test(s)){return 'formation';}
	if(/expérience|Professionnel/i.test(s)){return 'pro';}
	if(/sport|triathl|boxe/i.test(s)){return 'sport';}
	if(/coding|code|programmation|coding/i.test(s)){return 'code';}
	if(/seul|celibat|fille|femme|amour|drague|sexe|sexua|quelqun|intim|solitude/i.test(s)){return 'love';}
	if(/Qualités|Défauts|forts|atouts|force|faiblesse/i.test(s)){return 'qd';}
	if(/pression|stress/i.test(s)){return 'pression';}
	if(/autonome|ponctuel|indépendant|autodidacte/i.test(s)){return 'indépendant';}
	if(/mobile|voyage|déménage/i.test(s)){return 'mobilité';}
	if(/chef|supérieur|hierarchie/i.test(s)){return 'hierarchie';}
	if(/rémunération|salaire|salar/i.test(s)){return 'salaire';}
	if(/responsabilité|management/i.test(s)){return 'respo';}
	if(/journé|quotidien/i.test(s)){return 'day';}
	if(/équipe|team|intégration/i.test(s)){return 'team';}
	if(/difficulté|échec|erreur/i.test(s)){return 'fail';}
	if(/challenge|défi/i.test(s)){return 'challenge';}
	if(/compétence|technique/i.test(s)){return 'comp';}
	if(/non|refus/i.test(s)){return 'non';}
	if(/animaux|chien|chat/i.test(s)){return 'animaux';}
	if(/démission|quitte|partir/i.test(s)){return 'DEM';}
	if(/prison|trou/i.test(s)){return 'trou';}
	if(/rêve|perspective/i.test(s)){return 'dream';}
	if(/psy|mental|philosop/i.test(s)){return 'psy';}
	if(/personalité|valeurs/i.test(s)){return 'values';}
	if(/politique|argent|religion|culture/i.test(s)){return 'sujet';}
	if(/sociale|sociabilité|associat/i.test(s)){return 'assoc';}
	if(/itsm/i.test(s) && /pourquoi/i.test(s) ){return 'itsm';}
		return 'default';

}

module.exports=qHash;