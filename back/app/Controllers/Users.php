<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Users extends ResourceController
{
    protected $model;

    public function __construct() {
        $this->model = new UserModel();
    }

    use ResponseTrait;

    // get all user
    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond($data, 200);
    }

    // get single user
    public function show($id = null)
    {
        $data = $this->model->getWhere(['id' => $id])->getResult();
        if ($data)
        {
            http_response_code(200);
            return $this->respond($data);
        }
        else
        {
            return $this->failNotFound('No Data Found with id ' . $id);
        }
    }

    // create a user
    public function create()
    {
        $validation = \Config\Services::validation();
        
        $validation->setRules([
            'nombre' => 'required|min_length[2]|max_length[50]',
            'primer_apellido' => 'required|min_length[2]|max_length[50]',
            'segundo_apellido' => 'required|min_length[2]|max_length[50]',
            'fecha_nacimiento' => 'required|valid_date[Y-m-d]',
            'email' => 'required|valid_email',
            'rol' => 'required|in_list[Administrador,Gerente,Operador]'
        ]);
        $validation->withRequest($this->request)->run();

        $errors = $validation->getErrors();

        if ($errors) {
            return $this->fail($errors);
        }

        $user = $this->model->getUserByEmail($this->request->getVar('email'));

        if ($user) {
            return $this->fail('Email already exists');
        }

        $data = [
            'nombre' => $this->request->getVar('nombre'),
            'primer_apellido' => $this->request->getVar('primer_apellido'),
            'segundo_apellido' => $this->request->getVar('segundo_apellido'),
            'fecha_nacimiento' => $this->request->getVar('fecha_nacimiento'),
            'email' => $this->request->getVar('email'),
            'rol' => $this->request->getVar('rol')
        ];
        $this->model->insert($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Data Saved'
            ]
        ];

        return $this->respondCreated($data, 201);
    }

    // update user
    public function update($id = null)
    {
        $json = $this->request->getJSON();
        if ($json)
        {
            $data = [
                'nombre' => $json->nombre,
                'primer_apellido' => $json->primer_apellido,
                'segundo_apellido' => $json->segundo_apellido,
                'fecha_nacimiento' => $json->fecha_nacimiento,
                'email' => $json->email,
                'rol' => $json->rol
            ];
        }
        else
        {
            $input = $this->request->getRawInput();
            $data = [
                'nombre' => $input['nombre'],
                'primer_apellido' => $input['primer_apellido'],
                'segundo_apellido' => $input['segundo_apellido'],
                'fecha_nacimiento' => $input['fecha_nacimiento'],
                'email' => $input['email'],
                'rol' => $input['rol']
            ];
        }
        $validation = \Config\Services::validation();
        $validation->setRules([
            'nombre' => 'required|min_length[2]|max_length[50]',
            'primer_apellido' => 'required|min_length[2]|max_length[50]',
            'segundo_apellido' => 'required|min_length[2]|max_length[50]',
            'fecha_nacimiento' => 'required|valid_date[Y-m-d]',
            'email' => 'required|valid_email',
            'rol' => 'required|in_list[Administrador,Gerente,Operador]'
        ]);
        $validation->withRequest($this->request)->run();

        $errors = $validation->getErrors();

        if ($errors) {
            return $this->fail($errors);
        }

        $user = $this->model->getUserByEmail($this->request->getVar('email'), $id);

        if ($user) {
            return $this->fail('Email already exists');
        }

        $this->model->update($id, $data);
        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respond($response);
    }

    // delete user
    public function delete($id = null)
    {
        $data = $this->model->find($id);
        if ($data)
        {
            $this->model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Data Deleted'
                ]
            ];
            return $this->respondDeleted($response);
        }
        else
        {
            return $this->failNotFound('No Data Found with id ' . $id);
        }
    }

}
