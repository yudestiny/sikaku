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
            ->select('posts.id as id', 'posts.target', 'users.name as user_name', 'qualifications.name as qualification_name',
            'posts.created_at', 'posts.description', 'categories.id as category_id', 'services.name as service_name');

            return $favorites->paginate(9);
        }

        $query = Post::with('favorites')->join('users', 'posts.user_id', '=', 'users.id')
        ->join('qualifications', 'posts.qualification_id', '=', 'qualifications.id')
        ->join('categories', 'qualifications.category_id', '=', 'categories.id')
        ->select('posts.id', 'posts.target', 'users.name as user_name', 'qualifications.name as qualification_name', 'posts.created_at', 'posts.description', 'categories.id as category_id');

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

        $service = Service::CreateOrFirst(['name' => $request['service']]);
        $qualification = Qualification::CreateOrFirst([
            'name' => $request['qualification']
        ],[
            'category_id' => $request['category']
        ]);

        $post = Post::create([
            'user_id' => $request['id'],
            'target' => $request['target'],
            'qualification_id' => $qualification->id,
            'status_id' => $request['status'],
            'service_id' => $service->id,
            'start_date' => $request['start_date'],
            'description' => $request['description'],
        ]);

        // $post = new Post;
        // $post->user_id = $request['id'];
        // $post->target = $request['target'];
        // $post->qualification_id = $qualification['id'];
        // $post->status_id = $request['status'];
        // $post->service_id = $service['id'];
        // $post->start_date = $request['start_date'];
        // $post->description = $request['description'];
        // $post->save();

        // $postId = $post->id;



        foreach ($request['steps'] as $step) {
            if (!$step['serviceName'] || !$step['period']) {break;}
            $service = Service::CreateOrFirst(['name' => $step['serviceName']]);
            $stepPost = Step::create([
                'post_id' => $post->id,
                'step_number' => $step['stepNumber'],
                'service_id' =>$service->id,
                'period' => $step['period'],
                'description' => $step['description'],
            ]);
        }

        return response()->json($post);

    }

    public function detail($post_id)
    {
        $detail = Post::with('steps')->select('posts.id', 'users.id as user_id', 'posts.target', 'posts.start_date', 'statuses.name as status_name', 'statuses.id as status_id', 'posts.updated_at', 'users.name as user_name', 'services.name as service_name', 'qualifications.name as qualification_name', 'posts.created_at', 'posts.description')
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
        $post = Post::find($request['id']);
        $qualification = Qualification::find($post->qualification_id);

        if ($qualification['name'] !== $request['qualification']) {
            $qualification->update([
                'name' => $request['qualification'],
            ]);
        }
        $qualificationId = Qualification::select('id')->where('name', $request['qualification'])->first();
        $service = Service::createOrFirst(['name' => $request['service']]);
        $exSteps = Step::select('id')->where('post_id', $request['id'])->get()->toArray();

        $ExSteps = [];
        foreach ($exSteps as $ex) {
            $ExSteps[] = $ex['id'];
        }

        foreach ($request['steps'] as $step) {
            $exStep = Step::where('id',$step['id'])->first();
            $serviceStep = Service::createOrFirst(['name' => $step['name']]);

            if ($exStep && in_array($exStep['id'], $ExSteps)) {
                $ExSteps = array_diff($ExSteps, [$exStep['id']]);
                $exStep->update([
                    'id' => $exStep['id'],
                    'step_number' => $step['step_number'],
                    'service_id' => $serviceStep['id'],
                    'period' => $step['period'],
                    'description' => $step['description'],
                ]);
            } else {
                Step::create([
                    'post_id' => $post->id,
                    'step_number' => $step['step_number'],
                    'service_id' => $serviceStep['id'],
                    'period' => $step['period'],
                    'description' => $step['description'],
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
            'target' => $request['target'],
            'status_id' => $request['status'],
            'start_date' => $request['start_date'],
            'description' => $request['description'],
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
