    
    var sHTML = "";
	var xmlDoc = "";
	var v_foundlinkarray =  new Array();
	var v_foundlinkerror = new Array();
	var v_totallinks = new Array();
	var v_newtotallinks = new Array();
	var k = 0;
	function getErrorLinks()
	{
		//var exDiv = expandSection;
			var current = document.getElementById('Table3').style.display;

			if (current == 'block')
			{
				document.getElementById('Table3').style.display='none';
				//if (document.images) 
					//document.getElementById('Table3').src = expandO.src;
			}
			else
			{
				document.getElementById('Table3').style.display='block';
				//if (document.images) 
					//document.getElementById('Table3').src = expandC.src;
			}
			
		var j = 0;
		var h = 0;
		var q = 0;
		var strLink = " ";
		var strTotal = "<br>";
		
		// ////////////////////////////////////////////////////////////////////////
		// Explaination of the RegEx below - It bears explaination because it is CPU expensive:
		// zero-width negative lookahead
        //  . (any character)
        //  * (zero or more times) (non-greedy)
        //  Capture
        //    .gif
        //        or
        //    .jpg
        //        or
        //    media.expedia.com
        //        or
        //    schemas.microsoft.com
        //        or
        //    www.w3.oregex
        //        or
        //    ads.expedia.com
        //        or
        //    expediamail.com
        //  End Capture
        // End Capture
        // Capture
        //  http
        //    or
        //  https
        // End Capture
        // ://
        // Any character not in "\"|>"
        // + (one or more times)
		// ////////////////////////////////////////////////////////////////////////
		
		sHTML = document.getElementById("HTML").value;
		all_links = sHTML.match(/(?!.*?(\.gif|\.jpg|media\.expedia\.com|schemas\.microsoft\.com|www\.w3\.org|ads\.expedia\.com|expediamail\.com))(http|https)\:\/\/[^\"|>]+/g);
		//all_links = sHTML.match(/(?!.*?(\.gif|\.jpg|media\.expedia\.com|schemas\.microsoft\.com|www\.w3\.org|ads\.expedia\.com))(http|https)\:\/\/[^\"|>]+/g);
		setTimeout('document.getElementById("inprogress_img").style.cssText = "display:none;"', 800);
		
		// ////////////////////////////////////////////////////////////
		// The Regular Expressions below are the logic to identify the 
		// link anomalies and other unwanted characteristics 
		// in URL's in the email that is currently being viewed                                                              
		///////////////////////////////////////////////////////////////
		
		// These RegEx's are the for the Omniture in Epsilon

//		var regex = /(\?\?)/i;
//		var regex1 = /ADD\_URL/g;
//		var regex2 = /(\[\+GET\_LINK\_CONST\(\'OMNITURE\_VAR\'\)\+\]\&\[\+GET\_LINK\_CONST\(\'OMNITURE\_VAR\'\)\+\])/i;
//		var regex3 = /(CCheck\=1\&)/i;
//		var regex4 = /(\&\&)/i;
//		var regex5 = /(mcicid)/i;
//		var regex7 = /(\s)/i;
//		var regex9 = /(rfrr\=\d\d\d)|(rfrr\=\-)/i;
//		var regex10 = /(?!.*?\[\+GET\_LINK\_CONST\(\'OMNITURE\_VAR\'\)\+\])http\:\/\/[^\"]+/i;
//		var regex11 = /(\.asp\#)/i;
//		var regex12 = /(\d\d\d\?)/i;
//		var regex13 = /(INSERT\s)/i;
//		var regex14 = /(\/\/10\.95)/i;
//		var regex15 = /advert/i;
//		var regex16 = /(\[\+GET\_LINK\_CONST\(\'OMNITURE\_VAR\'\)\+\]\[\+GET\_LINK\_CONST\(\'OMNITURE\_VAR\'\)\+\])/i;
//		var regex17 = /\?\&/i;
//		var regex18 = /\&\?/i;

        // These are the Regular Expressions for Exact Target
        
        var regex = /(\?\?)/i;
		var regex1 = /ADD\_URL/g;
		var regex2 = /(\%\%\=OmnitureParams\(\'\'\)\=\%\%\&\\%\%\=OmnitureParams\(\'\'\)\=\%\%)/i;
		var regex3 = /(CCheck\=1\&)/i;
		var regex4 = /(\&\&)/i;
		var regex5 = /(mcicid)/i;
		var regex7 = /(\s)/i;
		var regex9 = /(rfrr\=\d\d\d)|(rfrr\=\-)/i;
		var regex10 = /(?!.*?\%\%\=OmnitureParams\(\'\'\)\=\%\%)http\:\/\/[^\"]+/i;
		var regex11 = /(\.asp\#)/i;
		var regex12 = /(\d\d\d\?)/i;
		var regex13 = /(INSERT\s)/i;
		var regex14 = /(\/\/10\.95)/i;
		var regex15 = /advert/i;
		var regex16 = /(\%\%\=OmnitureParams\(\'\'\)\=\%\%\%\%\=OmnitureParams\(\'\'\)\=\%\%)/i;
		var regex17 = /\?\&/i;
		var regex18 = /\&\?/i;
		var regex19 = /(\[\+GET\_LINK\_CONST\(\'OMNITURE\_VAR\'\)\+\])/i;



//		if (sHTML.match(/mgmt\_page\)\?\&/i) != -1)
//		{
//		}
//		else
//		{
//		    var regex15 = /\?\&/g;
//		}
		
		
		// //////////////////////////////////////////////////////////////////////
		// Begin iteratation through all the elements in 
		// the all_links array and apply the test method of all RegEx's to each one.  
		// Any element for which the test returns true will 
		// be copied to the foundlink array and the foundlinkerror array
		/////////////////////////////////////////////////////////////////////////
		
		
		var no_http = sHTML.match(/ADD\_URL/g);
		if (no_http)
		{
		    document.getElementById("firstError").style.cssText = "display:inline;";
		    document.getElementById("firstError").innerHTML = "<br /><font color=red><b>Error: Missing ("+ no_http.length +") URL(s) for this email campaign.  Please be sure to insert the proper URL(s) in place of ADD_URL within this form and then re-run the Link Checker.</b></font><br />";
		}
		for (var i = 0; i < all_links.length; i++)
		{
			 //v_totallinks[h] = all_links[i];
			 //h++;
			if (regex.test(all_links[i]) || regex1.test(all_links[i]) || regex2.test(all_links[i]) || regex3.test(all_links[i]) || regex4.test(all_links[i]) || regex5.test(all_links[i]) || regex7.test(all_links[i]) || regex9.test(all_links[i]) || regex10.test(all_links[i]) || regex11.test(all_links[i]) || regex12.test(all_links[i]) || regex13.test(all_links[i]) || regex14.test(all_links[i]) || regex15.test(all_links[i]) || regex16.test(all_links[i]) || regex17.test(all_links[i]) || regex18.test(all_links[i]) || regex19.test(all_links[i]))
			{
				v_foundlinkarray[j] = all_links[i];
				v_foundlinkerror[j] = all_links[i].match(regex) || all_links[i].match(regex1) || all_links[i].match(regex2) || all_links[i].match(regex3) || all_links[i].match(regex4) || all_links[i].match(regex5) || all_links[i].match(regex7) || all_links[i].match(regex9) || all_links[i].match(regex10) || all_links[i].match(regex11) || all_links[i].match(regex12) || all_links[i].match(regex13) || all_links[i].match(regex14) || all_links[i].match(regex15) || all_links[i].match(regex16) || all_links[i].match(regex17) || all_links[i].match(regex18) || all_links[i].match(regex19);
				if (all_links[i].match(regex))
				{
				    var dblQuestionMarks = "<font color=red><b>Error: double question marks</b></font><br />";
				}
				if (all_links[i].match(regex1))
				{
				    var URLHERE = "<font color=red><b>Error: The words - URL HERE - is embedded in URL string</b></font><br />";
				}
				if (all_links[i].match(regex2))
				{
				    var dblOmniture = "<font color=red><b>Error: dblOmniture embedded in URL string</b></font><br />";
				}
				if (all_links[i].match(regex3))
				{
				    var Check1 = "<font color=red><b>Error: CCheck=1& embedded in URL string</b></font><br />";
				}
				if (all_links[i].match(regex4))
				{
				    var dblAmpersand = "<font color=red><b>Error: double ampersand</b></font><br />";
				}
				if (all_links[i].match(regex5))
				{
				    var mcicid = "<font color=red><b>Error: mcicid found in URL</b></font><br />";
				}
				if (all_links[i].match(regex7))
				{
				    var space = "<font color=red><b>Error: white space found in URL</b></font><br />";
				}
				if (all_links[i].match(regex9))
				{
				    var rfrr = "<font color=red><b>Error: rfrr=XXXX or rfrr=-XXXX found in URL</b></font><br />";
				}
				if (all_links[i].match(regex10))
				{
				    var no_Omni = "<font color=red><b>Error: No Omniture found in URL</b></font><br />";
				}
				if (all_links[i].match(regex11))
				{
				    var lb_sign = "<font color=red><b>Error: # symbol found after .asp</b></font><br />";
				}
				if (all_links[i].match(regex12))
				{
				    var extra_qmark = "<font color=red><b>Error: ? symbol can only be placed immediately after .asp</b></font><br />";
				}
				if (all_links[i].match(regex13))
				{
				    var InsertLinkHere = "<font color=red><b>Error: INSERT LINK HERE found in URL</b></font><br />";
				}
				if (all_links[i].match(regex14))
				{
				    var badURL = "<font color=red><b>Error: 10.95 found in URL, should be www.expedia.com</b></font><br />";
				}
				if (all_links[i].match(regex15))
				{
				    var advert = "<font color=red><b>Error: advert found in URL, /advert/ cannot occur in the URL</b></font><br />";
				}
				if (all_links[i].match(regex16))
				{
				    var dblOmni = "<font color=red><b>Error: dblOmniture embedded in URL string</b></font><br />";
				}
				if (all_links[i].match(regex17))
				{
				    var QuestionAmper = "<font color=red><b>Error: ? is being followed immediately by an &</b></font><br />";
				}
				if (all_links[i].match(regex18))
				{
				    var AmperQuestion = "<font color=red><b>Error: & is being followed immediately by an ?</b></font><br />";
				}
				if (all_links[i].match(regex19))
				{
				    var oldOmniture = "<font color=red><b>Error: There is an old Omniture tag in this mail</b></font><br />";
				}
				if (v_foundlinkerror[j].length > 0)
				{
				    var extra_break = "<br />";
				}
				j++;
			}
			else
		    {
		        v_newtotallinks[q] = all_links[i];
		        q++;
		    }
		}
		if (v_foundlinkarray.length == 0)
		{
		    document.getElementById("no_Error").style.cssText = "display:inline;";
		    document.getElementById("no_Error").innerHTML = "<br /><font color=green><b>No Broken Links were found in this email</b></font><br />";
		}
		else
		{
		    for (k = 0; k < v_foundlinkarray.length; k++)
		    {
			    document.getElementById("Errors").style.cssText = "display:inline;";
			    document.getElementById("Errors").innerHTML = "<br /><font color=red><b>" + (k+1) + " Broken Link(s) on this page:</b></font><br /><br />";
			    if (v_foundlinkarray[k])
			    {
				    document.getElementById("Error"+k).style.cssText = "display:inline;";
				    document.getElementById("Error"+k).innerHTML = "<font color=red>" + k + " - <b style='color:#002157;'>[ ERROR: " + v_foundlinkerror[k] + " ]</b> " + v_foundlinkarray[k] + "</font><br />";
				    if (URLHERE)
				    {
				        document.getElementById("Error"+k).innerHTML += URLHERE;
				    }
				    if (dblQuestionMarks)
				    {
				        document.getElementById("Error"+k).innerHTML += dblQuestionMarks;
				    }
				    if (dblOmniture)
				    {
				        document.getElementById("Error"+k).innerHTML += dblOmniture;
				    }
				    if (Check1)
				    {
				        document.getElementById("Error"+k).innerHTML += Check1;
				    }
				    if (dblAmpersand)
				    {
				        document.getElementById("Error"+k).innerHTML += dblAmpersand;
				    }
				    if (mcicid)
				    {
				        document.getElementById("Error"+k).innerHTML += mcicid;
				    }
				    if (space)
				    {
				        document.getElementById("Error"+k).innerHTML += space;
				    }
				    if (rfrr)
				    {
				        document.getElementById("Error"+k).innerHTML += rfrr;
				    }
				    if (no_Omni)
				    {
				        document.getElementById("Error"+k).innerHTML += no_Omni;
				    }
				    if (lb_sign)
				    {
				        document.getElementById("Error"+k).innerHTML += lb_sign;
				    }
				    if (extra_qmark)
				    {
				        document.getElementById("Error"+k).innerHTML += extra_qmark;
				    }
				    if (InsertLinkHere)
				    {
				        document.getElementById("Error"+k).innerHTML += InsertLinkHere;
				    }
				    if (badURL)
				    {
				        document.getElementById("Error"+k).innerHTML += badURL;
				    }
				    if (advert)
				    {
				        document.getElementById("Error"+k).innerHTML += advert;
				    }
				    if (dblOmni)
				    {
				        document.getElementById("Error"+k).innerHTML += dblOmni;
				    }
				    if (QuestionAmper)
				    {
				        document.getElementById("Error"+k).innerHTML += QuestionAmper;
				    }
				    if (AmperQuestion)
				    {
				        document.getElementById("Error"+k).innerHTML += AmperQuestion;
				    }
				    if (oldOmniture)
				    {
				        document.getElementById("Error"+k).innerHTML += oldOmniture;
				    }
				    if (extra_break)
				    {
				        document.getElementById("Error"+k).innerHTML += extra_break;
				    }
			    }
			    document.getElementById("End").style.cssText = "display:inline;";
			    document.getElementById("End").innerHTML = "<br /><br />";
		    }
		}
		for (var n = 0; n < v_newtotallinks.length; n++)
		{
			document.getElementById("totalnum").innerHTML = "<br /><font color=green>Total of " + (n+1) + " links processed on this page.</font>";
			if (n % 2 == 0)
			{
				strTotal += "<span class='alt'><font color=green>" + n + " " + v_newtotallinks[n] + "</font></span><br />";
			}
			else
			{
				strTotal += "<span><font color=green>" + n + " " + v_newtotallinks[n] + "</font></span><br />";
			}
			document.all.totalvals.style.cssText = "display:block;";
			document.all.totalvals.innerHTML = strTotal;
			
		}
	}