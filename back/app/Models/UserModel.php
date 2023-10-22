<?php
namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id';
    protected $allowedFields = ['nombre', 'primer_apellido', 'segundo_apellido', 'fecha_nacimiento', 'email', 'rol'];

    public function getUserByEmail($email, $id = null)
    {
        if ($id === null) {
            $user = $this->where('email', $email)->first();
        } else {
            $user = $this->where('email', $email)->where('id !=', $id)->first();
        }
        return $user;
    }
}