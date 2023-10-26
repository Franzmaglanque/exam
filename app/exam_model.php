<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class practice_model extends Model
{
    protected $table = 'tblalbumsales';
	
	#Artist
	public function readArtistDetails($data,$id){
        $artist = DB::table('tblalbumsales')
			->select('tblalbumsales.id','tblalbumsales.artist')
			->where('id', $id);
        return $artist->get();
    }
	
	public function updateArtistDetails($data,$id){
        $artist = DB::table('tblalbumsales')
			->where('id', $id)
			->update([
                'artist' => $data[]['artist']
            ]);
        return $artist;
    }
	
	public function deleteArtistDetails($data,$id){
        $artist = DB::table('tblalbumsales')
        ->where('id', $id)->delete();    
        return $artist;
    }
	
	
	#Albums
	public function readAlbumsDetails($data,$album){
        $albums = DB::table('tblalbumsales')
			->select('tblalbumsales.date_released','tblalbumsales.artist','tblalbumsales.sales')
			->where('album', $album);
        return $albums->get();
    }
	
	public function updateAlbumsDetails($data,$album){
        $albums = DB::table('tblalbumsales')
			->where('album', $album)
			->update([
                'album' => $data[0]['album']
            ]);
        return $albums
    }
	
	public function deleteAlbumsDetails($data,$album){
        $albums = DB::table('tblalbumsales')
        ->where('album', $album)->delete();    
        return $albums;
    }
}
