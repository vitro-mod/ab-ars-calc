/* =============================================================
/   * Two Dimensional Interpolation JavaScript Library
	* Developed by Daniel Brooke Peig (daniel@danbp.org)
	*
	* http://www.danbp.org
	*
	*
	*
	*  Copyright (C) 2014  Daniel Brooke Peig
	*
	*	This program is free software: you can redistribute it and/or modify
	*	it under the terms of the GNU General Public License as published by
	*	the Free Software Foundation, either version 3 of the License, or
	*	(at your option) any later version.
	*
	*	This program is distributed in the hope that it will be useful,
	*	but WITHOUT ANY WARRANTY; without even the implied warranty of
	*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	*	GNU General Public License for more details.
	*
	*	You should have received a copy of the GNU General Public License
	*	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	*
	*
/* =============================================================*/
	
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
* @function Interpolizer
* @description Linear data interpolation from a two dimensional array
* @author daniel@brookepeig.com (Daniel Brooke Peig)
* @version 1.0
* @param {Array} Two dimensional array Z from X and Y. Indexes are in the first rows and columns.
* Any string value can be used in empty fields, for instance "void", don't use zero values as they will be computed. The software assumes the first row and columns as the headers.
* @param {Number} X value
* @param {Number} Y value 
* @return {Array} Result and error array (result.result=Z Value, result.error=Error message)
* 
*/
function Interpolizer(X, Y, ZValues) {

	//Z Values Range
	var X0Y0 = 0;
	var X0Y1 =0;
	var X1Y0 =0;
	var X1Y1 =0;

	//X and Y Ranges
	var X0 =0;
	var X1=0;
	var Y0=0;
	var Y1=0;

	//Indexes
	var X0i =0;
	var X1i =0;
	var Y0i =0;
	var Y1i =0;
	var Xmax = ZValues.length;
	var Ymax = ZValues[0].length;

	//Result
	var result = {result: 0, error: ""};

	//Interpolated values
	XMY0 = 0; //Interpolated Z from X at  Y0
	XMY1 = 0; //Interpolated Z from X at Y1
	XMYM = 0; //Interpolated Z from X and Y (result)

	//Check the boundary 
	if(X>ZValues[Xmax-1][0] || X<ZValues[1][0] || Y<ZValues[0][1] || Y>ZValues[0][Ymax-1]) result.error = "Interpolation error: Input out from the database range.";

	else {
		//Load the table data into the variables
		for (var i=1; i<Xmax-1;i++) {
			
			if(ZValues[i][0] == X) X0i = i;
			else if(ZValues[i+1][0] == X) X1i = i+1;
			if(X>= ZValues[i][0] && X<= ZValues[i+1][0]) {
				X0i = i;
				X1i = i+1;
			}
		}

		for (var i=1; i<=Ymax-1;i++){
			
			if(ZValues[0][i] == Y) Y0i = i;
			else if(ZValues[0][i+1] == Y) Y1i = i+1;
			else if(Y>= ZValues[0][i] && Y<= ZValues[0][i+1]) {
				Y0i = i;
				Y1i = i+1;
			}		
		}
		

		X0 = ZValues[X0i][0];
		X1 = ZValues[X1i][0];
		Y0 = ZValues[0][Y0i];
		Y1 = ZValues[0][Y1i];
		X0Y0 = ZValues[X0i][Y0i];
		X0Y1 = ZValues[X0i][Y1i];
		X1Y0 = ZValues[X1i][Y0i];
		X1Y1 = ZValues[X1i][Y1i];
		
		//Performs the calculations
		if((X==X0 || X==X1)&&(Y==Y0 || Y==Y1))
		result.error = "Exact match. No interpolation needed.";
		else result.error = "Interpolated result.";

		//X is on the lower edge, no interpolation needed
		if(X==X0) {
			XMY0 = X0Y0; 
			XMY1 = X0Y1;
		}
		//X is on the higher edge, no interpolation needed
		else if(X==X1) {
			XMY0 = X1Y0;
			XMY1 = X1Y1;
		}
		//X is between the higher and lower edges, interpolation needed
		else {
			XMY0 = X0Y0 + (X-X0)*(X1Y0-X0Y0)/(X1-X0);
			XMY1 = X0Y1 + (X-X0)*(X1Y1-X0Y1)/(X1-X0);
		}
		//Y is on the lower edge, no interpolation needed
		if(Y==Y0) {
			XMYM = XMY0;
		}
		//Y is on the higher edge, no interpolation needed
		else if(Y==Y1) {
			XMYM = XMY1; 
			
		}
		//Y is between the higher and lower edges, interpolation needed
		else {
			XMYM = XMY0 + (Y-Y0)*(XMY1-XMY0)/(Y1-Y0);
		}

		//Not valid data was found for the proper interpolation
		if(isNaN(XMYM)) 
		{
			result.error = "Interpolation error: No data found for those inputs.";
		}
		else result.result = XMYM;

	}

	return result;
}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/