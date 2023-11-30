<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Qualification;
use Illuminate\Http\Request;

class QualificationController extends Controller
{
    public function index ()
    {
        return Qualification::all();
    }
}
