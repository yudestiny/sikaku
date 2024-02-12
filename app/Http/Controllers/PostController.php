<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\Post;
use App\Models\Qualification;
use App\Models\Service;
use App\Models\Status;
use App\Models\Step;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function home()
    {
        $posts = Post::select('posts.id', 'posts.target', 'users.name as user_name', 'services.name as service_name', 'qualifications.name as qualification_name', 'posts.created_at', 'posts.description')->join('users', 'posts.user_id', '=', 'users.id')->join('services', 'posts.service_id', '=', 'services.id')->join('qualifications', 'posts.qualification_id', '=', 'qualifications.id')->limit(6)->orderBy('posts.created_at', 'desc')->get();

        foreach ($posts as $post) {
            $post->created_at = substr($post->created_at->format('Y-m-d'), 0, 10);
              }

        return $posts;
    }
    public function getQualificationRanking()
    {
        return Post::join('qualifications', 'posts.qualification_id', '=', 'qualifications.id')
        ->select('qualifications.id', 'qualifications.name', DB::raw('count(posts.qualification_id) as count'))
            ->groupBy('qualifications.id')
            ->groupBy('qualifications.name')
        ->limit(9)
        ->orderBy('count', 'desc')
        ->get();
    }

    public function index(Request $request)
    {
        if (!is_null($request['favorites'])) {
            $favorites = Post::whereHas('favorites', function($q) use ($request) {
                $q->where('user_id', '=', $request['favorites']);
            })
            ->with('favorites')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->join('services', 'posts.service_id', '=', 'services.id')
            ->join('statuses', 'posts.status_id', '=', 'statuses.id')
            ->leftJoin('qualifications', 'posts.qualification_id', '=', 'qualifications.id')
            ->join('categories', 'qualifications.category_id', '=', 'categories.id')
            ->select('posts.id as id', 'posts.score', 'posts.target', 'users.name as user_name', 'qualifications.name as qualification_name',
            'posts.created_at', 'posts.description', 'categories.id as category_id', 'services.name as service_name');

            return $favorites->paginate(9);
        }

        $query = Post::with('favorites')->join('users', 'posts.user_id', '=', 'users.id')
        ->join('qualifications', 'posts.qualification_id', '=', 'qualifications.id')
        ->join('categories', 'qualifications.category_id', '=', 'categories.id')
        ->select('posts.id', 'posts.score', 'posts.target', 'users.name as user_name', 'qualifications.name as qualification_name', 'posts.created_at', 'posts.description', 'categories.id as category_id');

        if (!is_null($request['category'])) {
            $query = $query->where('categories.id', '=', $request['category']);
        }
        if (!is_null($request['qualification'])) {
            $query = $query->where('qualifications.id', '=', $request['qualification']);
        }
        if (!is_null($request['user'])) {
            $query = $query->where('posts.user_id', '=', $request['user']);
        }

        return $query->paginate(9);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
            'qualification' => 'required|string',
            'category' => 'required|integer',
            'status' => 'required|integer',
            'target' => 'required|string',
            'service' => 'required|string',
            'start_date' => 'required',
            'score' => 'string',
            'description' => 'string',
        ]);

        $service = Service::CreateOrFirst(['name' => $validatedData['service']]);
        $qualification = Qualification::CreateOrFirst([
            'name' => $validatedData['qualification']
        ],[
            'category_id' => $validatedData['category']
        ]);

        $post = Post::create([
            'user_id' => $validatedData['id'],
            'target' => $validatedData['target'],
            'qualification_id' => $qualification->id,
            'status_id' => $validatedData['status'],
            'service_id' => $service->id,
            'start_date' => $validatedData['start_date'],
            'score' => $validatedData['score'],
            'description' => $validatedData['description'],
        ]);

        foreach ($request['steps'] as $step) {
            if (!$step['serviceName'] || !$step['period']) {break;}
            $validatedStep = $step->validate([
                'stepNumber' => 'required|integer',
                'serviceName' => 'string',
                'period' => 'required|string',
                'description' => 'required|string',
            ]);
            $service = Service::CreateOrFirst(['name' => $validatedStep['serviceName']]);
            Step::create([
                'post_id' => $post->id,
                'step_number' => $validatedStep['stepNumber'],
                'service_id' =>$service->id,
                'period' => $validatedStep['period'],
                'description' => $validatedStep['description'],
            ]);
        }

        return response()->json($post);

    }

    public function detail($post_id)
    {
        $detail = Post::with('steps')->select('posts.id', 'posts.score', 'users.id as user_id', 'posts.target', 'posts.start_date', 'statuses.name as status_name', 'statuses.id as status_id', 'posts.updated_at', 'users.name as user_name', 'services.name as service_name', 'qualifications.name as qualification_name', 'posts.created_at', 'posts.description')
        ->join('users', 'posts.user_id', '=', 'users.id')
            ->join('services', 'posts.service_id', '=', 'services.id')
            ->join('statuses', 'posts.status_id', '=', 'statuses.id')
        ->join('qualifications', 'posts.qualification_id', '=', 'qualifications.id')
        ->where('posts.id', $post_id)
            ->first();

        return response()->json($detail);
    }

    public function update (Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
            'qualification' => 'required|string',
            'category' => 'required|integer',
            'status' => 'required|integer',
            'target' => 'required|string',
            'service' => 'required|string',
            'start_date' => 'required',
            'score' => 'string',
            'description' => 'string',
        ]);
        $post = Post::find($validatedData['id']);
        $qualification = Qualification::find($post->qualification_id);

        if ($qualification['name'] !== $validatedData['qualification']) {
            $qualification->update([
                'name' => $request['qualification'],
            ]);
        }
        $qualificationId = Qualification::select('id')->where('name', $validatedData['qualification'])->first();
        $service = Service::createOrFirst(['name' => $validatedData['service']]);
        $exSteps = Step::select('id')->where('post_id', $validatedData['id'])->get()->toArray();

        $ExSteps = [];
        foreach ($exSteps as $ex) {
            $ExSteps[] = $ex['id'];
        }

        foreach ($request['steps'] as $step) {
            $validatedStep = $step->validate([
                'step_number' => 'required|integer',
                'serviceName' => 'string',
                'period' => 'required|string',
                'description' => 'required|string',
            ]);
            $exStep = Step::where('id',$validatedStep['id'])->first();
            $serviceStep = Service::createOrFirst(['name' => $validatedStep['name']]);

            if ($exStep && in_array($exStep['id'], $ExSteps)) {
                $ExSteps = array_diff($ExSteps, [$exStep['id']]);
                $exStep->update([
                    'id' => $exStep['id'],
                    'step_number' => $validatedStep['step_number'],
                    'service_id' => $serviceStep['id'],
                    'period' => $validatedStep['period'],
                    'description' => $validatedStep['description'],
                ]);
            } else {
                Step::create([
                    'post_id' => $post->id,
                    'step_number' => $validatedStep['step_number'],
                    'service_id' => $serviceStep['id'],
                    'period' => $validatedStep['period'],
                    'description' => $validatedStep['description'],
                ]);
                
            }
            }
            
            foreach ($ExSteps as $ex) {
                Step::find($ex)
                ->delete();
            }


        $post->update([
            'qualification_id' => $qualificationId->id,
            'service_id' => $service['id'],
            'target' => $validatedData['target'],
            'status_id' => $validatedData['status'],
            'start_date' => $validatedData['start_date'],
            'score' => $validatedData['score'],
            'description' => $validatedData['description'],
            'updated_at' => now()
        ]);

        return ['message' => '編集を保存しました'];

    }

    public function destroy ($post_id)
    {
        $post = Post::find($post_id);

        $post->delete();

        return response()->json(['message' => '正常に削除されました。']);
    }
}
