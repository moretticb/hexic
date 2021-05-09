//////////////////////////////////////////////////////////////////////////////
//
//          scripts.js - Hexic puzzle implementation
//  Copyright (c) 2021 Caio Benatti Moretti <caiodba@gmail.com>
//                 http://www.moretticb.com/
//
//  This library is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program. If not, see <http://www.gnu.org/licenses/>.
//
//////////////////////////////////////////////////////////////////////////////

colors = ["unused","dark","red","green","blue","yellow","ice"];
primes = [1,11,13,17,19]; //for special types of blocks

matrix_w = 8
matrix_h = 9
hexmatrix = [];

hex_w = 60;
hex_h = 50;
hex_ovlp = 1.6*(hex_w-hex_h);
rotate_ccw = false;

function start_game(){
	for(i=0;i<matrix_h;i++){
		hexmatrix[i]=[];
		for(j=0;j<matrix_w;j++){
			hexmatrix[i][j] = create_random_block();//Math.round(Math.random()*(colors.length-2)+1)
		}
	}

	do {
		hexmatrix = detect_combs(hexmatrix).matrix;
		var remblocks = fall_blocks();
	} while(remblocks.length > 0);


	hexmatrix[8][6] *= primes[2];
	hexmatrix[8][3] *= primes[2];
	hexmatrix[0][1] *= primes[2];
	hexmatrix[0][4] *= primes[2];
	hexmatrix[4][0] *= primes[2];
	hexmatrix[4][7] *= primes[2];
	hexmatrix[3][3] *= primes[2];
	hexmatrix[7][1] *= primes[2];

}

function cp(obj){ // deep copy
	return JSON.parse(JSON.stringify(obj));
}

function create_random_block(){
	var blocknum = Math.round(Math.random()*(colors.length-2)+1);
	//console.log("creating "+colors[blocknum]+" block");
	return blocknum;
}

function get_hex_pos(i,j){
	return {
		top: hex_h*i + (j%2==1 ? hex_h/2 : 0),
		left: (hex_w - hex_ovlp)*j
	};
}

function get_hex_id(mx, my){
	var id = {j_raw: mx/(hex_w - hex_ovlp)};
	id.j = parseInt(id.j_raw);
	
	id.i_raw = (my - (id.j%2==1 ? hex_h/2 : 0))/hex_h;
	id.i = parseInt(id.i_raw);

	return id;
}

function isint(n){
	return n == parseInt(n);
}

function block_type(block){
	var value = hexmatrix[block.i][block.j];
	if(value < 0)
		return -1;
	else
		for(var t=1;t<primes.length;t++)
			if(isint(value / primes[t]))
				return t;
	return 0;
}

function get_cum_type(block){
	var value = hexmatrix[block.i][block.j];
	var type = block_type(block);
	var times=0;
	while(value > 10){
		times++;
		value /= primes[type];
	}
	return times-1;
}

function decum_block(block){ //remove cumulative combs of a special block
	var value = hexmatrix[block.i][block.j];
	var type = block_type(block);
	var cum = get_cum_type(block);
	if(cum > 0)
		hexmatrix[block.i][block.j] = value/Math.pow(primes[type],cum)
}

function get_cum_blocks(j){
	var bcum = {};
	for(var i=0;i<matrix_h;i++){
		var block = {i:i,j:j};
		var type = block_type(block);
		var cum = get_cum_type(block);

		if(cum > 0){
			if(bcum["c"+type])
				bcum["c"+type] += cum;
			else
				bcum["c"+type]= cum;
			decum_block(block);
		}
	}
	return bcum;
}

function fall_blocks(){
	var blocks = []; //for animation

	for(var j=0;j<matrix_w;j++){
		var tofill = 0;
		var cb = get_cum_blocks(j); //cum blocks to create instead of random block
		for(var i=matrix_h-1;i>=0;i--){
			if(hexmatrix[i][j] < 0){
				if(tofill==0){
					for(var h=i;h>=0;h--){
						if(hexmatrix[h][j] > 0){
							hexmatrix[i][j] = hexmatrix[h][j];
							hexmatrix[h][j] *= -1;

							blocks.push({i: h, j: j, new_i: i});

							i--;
						} else {
							tofill++;
						}
					}
					i++;
				} else {
					var newtype = 0;
					if(cb["c1"] > 0){ // implement more types of special blocks here
						newtype = 1;
						cb["c1"]--;
					}

					hexmatrix[i][j] = create_random_block()*primes[newtype];
					blocks.push({i: -1, j: j, new_i: i});

					tofill--;
				}
			}
		}
	}
	return blocks;
}

function rotate_blocks(blocks,turn){
	var rotated;
	var type = block_type(blocks[0]);
	if(type > 0 && turn==3 && can_rotate_normally(blocks[0])){
		if(type == 1)
			blocks = get_circ_blocks(blocks[0]);
		else if(type == 2)
			blocks = get_bigtri_blocks(blocks[0]);
		rotated = rotate(blocks, rotate_ccw);
	} else
		rotated = rotate_tri(blocks, rotate_ccw);

	realloc_blocks(rotated);
	return rotated;
}

function realloc_blocks(blocks){
	for(var b=0;b<blocks.length;b++){
		hexmatrix[blocks[b].new_i][blocks[b].new_j] = blocks[b].value;
	}
}

function rotate(blocks, ccw){
	var rot_idx = [];
	for(var b=0;b<blocks.length;b++)
		rot_idx.push(b);

	if(ccw)
		rot_idx.reverse();

	for(var b=1;b<=blocks.length;b++){
		var circ_idx = rot_idx[b%blocks.length];
		blocks[circ_idx].new_i = blocks[rot_idx[b-1]].i;
		blocks[circ_idx].new_j = blocks[rot_idx[b-1]].j;
		blocks[circ_idx].value = hexmatrix[blocks[circ_idx].i][blocks[circ_idx].j];
	}
	return blocks;
}

function rotate_tri(blocks, ccw){
	ordered = [];

	if(blocks[0].j==blocks[1].j){
		if(blocks[0].i < blocks[1].i){
			ordered = [blocks[0],blocks[1],blocks[2]];
		} else {
			ordered = [blocks[1],blocks[0],blocks[2]];
		}
	} else if(blocks[0].j==blocks[2].j){
		if(blocks[0].i < blocks[2].i){
			ordered = [blocks[0],blocks[2],blocks[1]];
		} else {
			ordered = [blocks[2],blocks[0],blocks[1]];
		}
	} else {
		if(blocks[1].i < blocks[2].i){
			ordered = [blocks[1],blocks[2],blocks[0]];
		} else {
			ordered = [blocks[2],blocks[1],blocks[0]];
		}
	}

	if(ordered[2].j > ordered[0].j){
		ordered = rotate(ordered,ccw);

	} else {
		temp = ordered[2];
		ordered[2]=ordered[1];
		ordered[1]=temp;
		ordered = rotate(ordered,ccw);
	}
	
	return ordered;
}

function reset_matrix_state(matrix){
	matrix = cp(matrix);

	for(var i=0;i<matrix_h;i++){
		for(var j=0;j<matrix_w;j++){
			matrix[i][j] = Math.abs(matrix[i][j]);
		}
	}
	return matrix;
}

function detect_circ_combs(matrix){
	matrix = cp(matrix);

	var res = {combs: 0};

	for(var j=1;j<matrix_w-1;j++){
		for(var i=1;i<matrix_h-1;i++){
			var blocks = get_circ_blocks({i: i, j: j});
			if(
			( // normal blocks
				Math.abs(matrix[blocks[0].i][blocks[0].j]) == Math.abs(matrix[blocks[1].i][blocks[1].j]) &&
				Math.abs(matrix[blocks[0].i][blocks[0].j]) == Math.abs(matrix[blocks[2].i][blocks[2].j]) &&
				Math.abs(matrix[blocks[0].i][blocks[0].j]) == Math.abs(matrix[blocks[3].i][blocks[3].j]) &&
				Math.abs(matrix[blocks[0].i][blocks[0].j]) == Math.abs(matrix[blocks[4].i][blocks[4].j]) &&
				Math.abs(matrix[blocks[0].i][blocks[0].j]) == Math.abs(matrix[blocks[5].i][blocks[5].j])
			)
			||
			( // special blocks
				block_type({i: blocks[0].i, j: blocks[0].j}) > 0 && 
				block_type({i: blocks[0].i, j: blocks[0].j}) == block_type({i: blocks[1].i, j: blocks[1].j}) &&
				block_type({i: blocks[0].i, j: blocks[0].j}) == block_type({i: blocks[2].i, j: blocks[2].j}) &&
				block_type({i: blocks[0].i, j: blocks[0].j}) == block_type({i: blocks[3].i, j: blocks[3].j}) &&
				block_type({i: blocks[0].i, j: blocks[0].j}) == block_type({i: blocks[4].i, j: blocks[4].j}) &&
				block_type({i: blocks[0].i, j: blocks[0].j}) == block_type({i: blocks[5].i, j: blocks[5].j}) 
			)
			){
				for(var b=0;b<blocks.length;b++)
					matrix[blocks[b].i][blocks[b].j] = -Math.abs(matrix[blocks[b].i][blocks[b].j]);
				matrix[i][j] = matrix[i][j]*primes[block_type({i: blocks[0].i, j: blocks[0].j})+1]; // upgrading block type
				res.combs++;
			}
		}
	}
	res.matrix = matrix;
	return res;
}

function detect_tri_combs(matrix){
	matrix = cp(matrix);

	var res = {combs: 0};

	for(var j=0;j<matrix_w;j++){
		for(var i=0;i<matrix_h-1;i++){
			if(j%2==0){
				// triangle pointing to the right
				if(j<matrix_w &&
					(Math.abs(matrix[i][j]) == Math.abs(matrix[i+1][j]) && Math.abs(matrix[i][j]) == Math.abs(matrix[i][j+1])) //normal blocks
					||
					(block_type({i:i, j:j}) >= 1 && block_type({i:i, j:j}) == block_type({i:i+1, j:j}) && block_type({i:i, j:j}) == block_type({i:i, j:j+1})) // special blocks
				){
					matrix[i][j] = -Math.abs(matrix[i][j])
					matrix[i+1][j] = -Math.abs(matrix[i+1][j])
					matrix[i][j+1] = -Math.abs(matrix[i][j+1])
					res.combs++;
				}

				// triangle pointing to the left
				if(j>0 &&
					(Math.abs(matrix[i][j]) == Math.abs(matrix[i+1][j]) && Math.abs(matrix[i][j]) == Math.abs(matrix[i][j-1])) // normal blocks
					||
					(block_type({i:i, j:j}) >= 1 && block_type({i:i, j:j}) == block_type({i:i+1, j:j}) && block_type({i:i, j:j}) == block_type({i:i, j:j-1})) // special blocks
				){
					matrix[i][j] = -Math.abs(matrix[i][j])
					matrix[i+1][j] = -Math.abs(matrix[i+1][j])
					matrix[i][j-1] = -Math.abs(matrix[i][j-1])
					res.combs++;
				}
			} else {
				// triangle pointing to the right
				if(j<matrix_w &&
					(Math.abs(matrix[i][j]) == Math.abs(matrix[i+1][j]) && Math.abs(matrix[i][j]) == Math.abs(matrix[i+1][j+1])) // normal blocks
					||
					(block_type({i:i, j:j}) >= 1 && block_type({i:i, j:j}) == block_type({i:i+1, j:j}) && block_type({i:i, j:j}) == block_type({i:i+1, j:j+1})) // special blocks
				){
					matrix[i][j] = -Math.abs(matrix[i][j])
					matrix[i+1][j] = -Math.abs(matrix[i+1][j])
					matrix[i+1][j+1] = -Math.abs(matrix[i+1][j+1])
					res.combs++;
				}

				// triangle pointing to the left
				if(j>0 &&
					(Math.abs(matrix[i][j]) == Math.abs(matrix[i+1][j]) && Math.abs(matrix[i][j]) == Math.abs(matrix[i+1][j-1])) // normal blocks
					||
					(block_type({i:i, j:j}) >= 1 && block_type({i:i, j:j}) == block_type({i:i+1, j:j}) && block_type({i:i, j:j}) == block_type({i:i+1, j:j-1})) // special blocks
				){
					matrix[i][j] = -Math.abs(matrix[i][j])
					matrix[i+1][j] = -Math.abs(matrix[i+1][j])
					matrix[i+1][j-1] = -Math.abs(matrix[i+1][j-1])
					res.combs++;
				}
			}
		}
	}
	res.matrix = matrix;
	return res;
}

function detect_combs(matrix){
	matrix = cp(matrix);

	var res_circ = detect_circ_combs(matrix);
	var res_tri = detect_tri_combs(res_circ.matrix); //cumulative

	return {matrix: res_tri.matrix, comb_circ: res_circ.combs, comb_tri: res_tri.combs};
}

function get_nearest(mouse_x,mouse_y){

	var shortest = [0];
	var dists = [];

	ijlist=[];
	for(var i=0;i<matrix_h;i++){
		for(j=0;j<matrix_w;j++){
			ijlist.push({i: i, j: j});
		}
	}


	for(a=0;a<ijlist.length;a++){
		hex = document.getElementById("hex_"+ijlist[a].i+"_"+ijlist[a].j);
		center = [hex.offsetTop+(hex_h/2), hex.offsetLeft+(hex_w/2)];

		d = parseInt(Math.sqrt(Math.pow(
			center[0]-window.event.clientY
			,2)+Math.pow(
			center[1]-window.event.clientX
			,2)))
		dists.push(d)
		//hex.innerHTML = d;

		if(shortest.length == 0){
			shortest.push(a);
		} else {
			var stop_idx = -1;
			for(st=0;st<shortest.length && stop_idx==-1;st++){
				if(dists[a] < dists[shortest[st]]){
					stop_idx = st;
				}
			}
			shortest.splice(stop_idx,0,a);
		}
	}

	return [ijlist[shortest[0]], ijlist[shortest[1]], ijlist[shortest[2]]];
}

function get_circ_blocks(block){ // special block 1
	var blocks = [];
	if(block.j%2==0){
		blocks.push({i: block.i, j: block.j+1});
		blocks.push({i: block.i-1, j: block.j+1});
		blocks.push({i: block.i-1, j: block.j});
		blocks.push({i: block.i-1, j: block.j-1});
		blocks.push({i: block.i, j: block.j-1});
		blocks.push({i: block.i+1, j: block.j});
	} else {
		blocks.push({i: block.i, j: block.j+1});
		blocks.push({i: block.i-1, j: block.j});
		blocks.push({i: block.i, j: block.j-1});
		blocks.push({i: block.i+1, j: block.j-1});
		blocks.push({i: block.i+1, j: block.j});
		blocks.push({i: block.i+1, j: block.j+1});
	}
	return blocks;
}

function get_bigtri_blocks(block){
	var blocks = [];
	if(block.j%2==0){
		blocks.push({i: block.i-1, j: block.j});
		blocks.push({i: block.i, j: block.j-1});
		blocks.push({i: block.i, j: block.j+1});
	} else {
		blocks.push({i: block.i-1, j: block.j});
		blocks.push({i: block.i+1, j: block.j-1});
		blocks.push({i: block.i+1, j: block.j+1});
	}
	return blocks;
}

function can_rotate_normally(block){
	var type = block_type(block);
	if(type == 1)
		return block.i < matrix_h-1 && block.i > 0 && block.j > 0 && block.j < matrix_w-1;
	else if(type == 2){
		return block.i < matrix_h-1+(block.j%2==0) && block.i > 0 && block.j > 0 && block.j < matrix_w-1;
	}

	return false;
}

function highlight_hex(blocks){
	//if(hexmatrix[blocks[0].i][blocks[0].j] > 9 && can_rotate_normally(blocks[0])){
	var type = block_type(blocks[0]);
	if(type > 0 && can_rotate_normally(blocks[0])){
		if(type == 1)
			blocks = get_circ_blocks(blocks[0]);
		else if(type == 2)
			blocks = get_bigtri_blocks(blocks[0]);
	}

	var mntop = 0;
	var mnleft = 0;
	for(b=0;b<blocks.length;b++){
		hl_dom = document.getElementById("hl_"+b);

		pos = get_hex_pos(blocks[b].i,blocks[b].j);

		hl_dom.style.left = pos.left+"px";
		hl_dom.style.top = pos.top+"px";
		hl_dom.style.display = "inline-block";

		mntop += pos.top;
		mnleft += pos.left;
	}
	hl_rot = document.getElementById("rot_ind");
	hl_rot.className = "rot_ind_"+(rotate_ccw? "ccw" : "cw");
	hl_rot.style.top = (mntop/blocks.length)+"px";
	hl_rot.style.left = (mnleft/blocks.length)+"px";
	hl_rot.style.display = "inline-block";
	

	//document.title = blocks.length;
	for(b=blocks.length;b<6;b++){ // hiding highlighting blocks not in use
		hl_dom = document.getElementById("hl_"+b);
		hl_dom.style.left = "0px";
		hl_dom.style.top = "450px";
		hl_dom.style.display = "none";
	}
}

function draw_block(block, isnew){
	var type = block_type(block);
	var markup = "";
	var styles=[];

	if(type >= 1){
		//styles.push("background: orange");
		styles.push("background-image: url('sp_"+type+".png')");
	} else if(type == 0){
		styles.push("background-image: url('hexb_"+colors[hexmatrix[block.i][block.j]]+".png')");
	} else {
		styles.push("background: none");
	}

	styles.push("position: absolute");
	if(isnew)
		styles.push("top: "+get_hex_pos(-2,block.j).top);
	else
		styles.push("top: "+get_hex_pos(block.i,block.j).top);
	styles.push("left: "+get_hex_pos(block.i,block.j).left);
	
	markup += '<div id="'+(isnew?"new":"")+'hex_'+block.i+'_'+block.j+'" class="hexblock" style="'+styles.join("; ")+'"></div>';
	return markup;
}

function markup2dom(markup){
	var elem = document.createElement("div");
	elem.innerHTML = markup;

	return elem.firstChild;
}

function draw_matrix(){
	var markup = "";
	for(var i=0;i<matrix_h;i++){
		for(j=0;j<matrix_w;j++){
			/*var styles=[];
			//styles.push("background-color: "+colors[hexmatrix[i][j]]);

			var blk = block_type({i: i, j: j});
			if(blk == 1){
				styles.push("background: orange");
			} else if(blk>=0){
				styles.push("background-image: url('hexb_"+colors[hexmatrix[i][j]]+".png')");
			} else {
				styles.push("background: none");
				//styles.push("background-image: url('hexb_"+colors[Math.abs(hexmatrix[i][j])]+".png')");
				//styles.push("border: 1px solid black");
			}

			styles.push("position: absolute");
			styles.push("top: "+get_hex_pos(i,j).top);
			styles.push("left: "+get_hex_pos(i,j).left);
			
			markup += '<div id="hex_'+i+'_'+j+'" class="hexblock" style="'+styles.join("; ")+'"></div>';
			*/
			var block = {i: i, j: j};
			markup += draw_block(block, false);
		}
	}

	for(hl=0;hl<6;hl++){
		markup += '<div id="hl_'+hl+'" class="hexblock_hl"></div>';
	}
	markup += '<div id="rot_ind" class="rot_ind"></div>';
	//markup += '<div id="debug" class="debug"></div>';
	return markup;
}

function redraw_matrix(){
	var blockarea = document.getElementById("blockarea");
	blockarea.innerHTML = draw_matrix();

	var debugstr = "<pre>";
	for(var i=0;i<matrix_h;i++){
		debugstr += hexmatrix[i].join("\t")+"\n";
	}
	debugstr += "</pre>";
	document.getElementById("debug").innerHTML = debugstr;
}

function anim_rot_blocks(blocks, turn){
	var anim_time = 0.3; //seconds
	var omf = null;

	for(var b=0;b<blocks.length;b++){
		var blkdom = document.getElementById("hex_"+blocks[b].i+"_"+blocks[b].j);
		var newpos = get_hex_pos(blocks[b].new_i,blocks[b].new_j);

		tw = new Tween(
			blkdom.id,
			"top",
			Quartic.prototype.easeInOut,
			blkdom.offsetTop,
			newpos.top,
			anim_time,
			true
		);
		tw = new Tween(
			blkdom.id,
			"left",
			Quartic.prototype.easeInOut,
			blkdom.offsetLeft,
			newpos.left,
			anim_time,
			true
		);

		if(omf==null){
			omf = function(){
				redraw_matrix();
				if(!keep_falling() && turn < 3 && blocks.length==3){
					var rotated = rotate_blocks(blocks, turn);
					anim_rot_blocks(rotated,turn+1,keep_falling);
				}
			}
			tw.onMotionFinished = omf;
		}
	}
}

function anim_fade_blocks(what_next){
	var omf = null;
	for(var j=0;j<matrix_w;j++){
		for(var i=0;i<matrix_h;i++){

			if(hexmatrix[i][j] > 0)
				continue;

			var blkdom = document.getElementById("hex_"+i+"_"+j);
			tw = new Tween(
				blkdom.id,
				"opacity",
				Quartic.prototype.easeInOut,
				1,
				0,
				0.5,
				true
			);
			if(omf==null){
				omf = what_next;
				tw.onMotionFinished = omf;
			}
		}
	}
	
}

function anim_blocks(blocks){
	var newblocks = [];
	for(var b=0;b<blocks.length;b++){
		var blk = blocks[b];
		if(blk.i < 0){
			newblocks.push(blk);
			continue;
		}
		var blkdom = document.getElementById("hex_"+blk.i+"_"+blk.j);
		tw = new Tween(
			blkdom.id,
			"top",
			Quartic.prototype.easeInOut,
			blkdom.offsetTop,
			get_hex_pos(blk.new_i,blk.j).top,
			0.5,
			true
		);
	}
	
	var omf = null;
	for(var b=0;b<newblocks.length;b++){
		var blk = newblocks[b];
		var blockarea = document.getElementById("blockarea");
		var newdomblk = markup2dom(draw_block({i: blk.new_i, j: blk.j}, true));
		var thepos = get_hex_pos(blk.new_i,blk.j);

		blockarea.appendChild(newdomblk);

		new Tween(
			newdomblk.id,
			"top",
			Quartic.prototype.easeInOut,
			get_hex_pos(-2,j).top,
			thepos.top,
			0.5,
			true
		);
		if(omf==null){
			omf = function(){
				redraw_matrix();
				keep_falling();
			}
			tw.onMotionFinished = omf;
		}
	}
}

function keep_falling(){
	var res = detect_combs(hexmatrix);
	hexmatrix = res.matrix;

	if(res.comb_circ + res.comb_tri > 0){
		anim_fade_blocks(function(){
			anim_blocks(fall_blocks());
		});
		return true;
	}
	return false;
}

function rotate_and_update(evt){
	var hascomb = false;
	var res = {};
	var nearest_blocks = get_nearest(evt.clientX, evt.clientY);
	var turn = block_type(nearest_blocks[0])==0 ? 1 : can_rotate_normally(nearest_blocks[0]) ? 3 : 1;

	rotated = rotate_blocks(nearest_blocks,turn);
	anim_rot_blocks(rotated,turn,keep_falling);
}

window.onload = function(){
	//var blockarea = document.getElementById("blockarea");

	//blockarea.innerHTML = draw_matrix();
	start_game();
	redraw_matrix();

	blockarea.onmousemove = function(){
		highlight_hex(get_nearest(window.event.clientX, window.event.clientY));
	}

	blockarea.onclick = function(){
		rotate_and_update(window.event);
	}

	window.onkeypress = function(){
		var keyCode = window.event.keyCode;
		if(keyCode == 32){ //space
			rotate_ccw = !rotate_ccw;
			document.title = "rotating "+(rotate_ccw? "ccw" : "cw");

			document.getElementById("rot_ind").className = "rot_ind_"+(rotate_ccw? "ccw" : "cw");
		}
	}
}
