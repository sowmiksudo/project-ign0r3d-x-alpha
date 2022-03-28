<?php

namespace App\Http\Controllers;

use App\Models\API;
use App\Models\PublicApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class ApiController extends Controller
{

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->middleware("auth:api");
        $this->user = Auth::guard("api")->user();
    }

    private function getArrayType($array)
    {
        if (array_keys($array) !== range(0, count($array) - 1)) {
            return false;
        } else {
            return true;
        }
    }

    private function appendToApiJson($array)
    {
        $API = API::where("user_id", $this->user->id)->first();
        $api_arr = json_decode($this->user->api->apis);
        foreach ($array as $arr) {
            array_push($api_arr, $arr);
        }
        $count = count($api_arr);
        $added = $API->update([
            "apis" => json_encode($api_arr),
            "api_count" => $count
        ]);
        return $added;
    }

    private function saveApiJson($array)
    {
        // $API = API::where("user_id", $this->user->id)->first();
        // $count = count($array);
        // $added = $API->update([
        //     "apis" => json_encode($array),
        //     "api_count" => $count
        // ]);

        // foreach ($array as $api) {
        //     API::updateOrCreate([
        //         "id"=>$api->id
        //     ]);
        // }

        return true;
    }

    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|max:20",
            "url" => "required",
            "method" => "required"
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => $validator->messages()->toArray()
            ];
        }

        $success = $this->user->apis()->create([
            "name" => $request->name,
            "config" => json_encode([
                "url" => $request->url ?? "",
                "method" => $request->method ?? "get",
                "headers" => json_decode($request->req_headers) ?? json_decode("{}"),
                "body" => $request->body ?? ""
            ]),
            "ip" => $request->ip(),
            "userAgent" => $request->userAgent()
        ]);

        return $success ? [
            "success" => true,
            "message" => "APIs are being added to your hub."
        ] : [
            "sucecss" => false,
            "message" => "Something went wrong on our side."
        ];
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|max:20",
            "url" => "required",
            "method" => "required"
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => $validator->messages()->toArray()
            ];
        }

        $api = $this->user->apis()->find($request->id);

        if($api === null){
            return [
                "success"=>false,
                "message"=>"NOT FOUND"
            ];
        }

        $success = $api->update([
            "name" => $request->name,
            "config" => json_encode([
                "url" => $request->url ?? "",
                "method" => $request->method ?? "get",
                "headers" => json_decode($request->req_headers) ?? json_decode("{}"),
                // "headers" => json_decode($request->headers) ?? json_decode("{}"),
                "body" => $request->body ?? ""
            ]),
            "ip" => $request->ip(),
            "userAgent" => $request->userAgent()
        ]);

        return $success ? [
            "success" => true,
            "message" => "API saved successfully."
        ] : [
            "sucecss" => false,
            "message" => "Something went wrong on our side."
        ];
    }


    public function delete(Request $request)
    {
        $item = API::find($request->id);
        if($item === null){
            return [
                "success"=>false,
                "message"=>"NOT FOUND"
            ];
        }

        $deleted = API::findOrFail($request->id)->delete();
        return [
            "success" => true,
            "message" => "API deleted successfully."
        ];
    }


    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "array" => "required"
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => $validator->messages()->toArray()
            ];
        }


        if (gettype($request->array) !== "array") {
            return [
                "success" => false,
                "message" => "Given API array is invalid."
            ];
        }
        if (!$this->getArrayType($request->array)) {
            return [
                "success" => false,
                "message" => "Given API array is invalid."
            ];
        }

        $success = $this->saveApiJson($request->array);

        return $success ? [
            "success" => true,
            "message" => "APIs are being added to your hub."
        ] : [
            "sucecss" => false,
            "message" => "Something went wrong on our side."
        ];
    }

    public function get(Request $request)
    {

        $apis = $this->user->apis;
        $public_apis = PublicApi::all();

        $private = [];
        $public = [];

        foreach ($apis as $api) {
            $config = json_decode($api->config);
            $api->config = $config;
            array_push($private, $api);
        }
        foreach ($public_apis as $api) {
            $config = json_decode($api->config);
            $api->config = $config;
            array_push($public, $api);
        }


        return [
            "success" => true,
            "user" => $this->user->makeHidden("apis"),
            "api_json" => [
                "public" => $public,
                "private" => $private
            ]
        ];
    }

    public function import(Request $request)
    {
        if (!$this->getArrayType($request->all())) {
            return [
                "success" => false,
                "message" => "Given API array is invalid."
            ];
        }
        foreach ($request->all() as $api) {
            $config = $api["config"];
            $this->user->apis()->create([
                "name" => $api["name"],
                "config" => json_encode([
                    "url" => $config["url"] ?? "",
                    "method" => $config["method"] ?? "get",
                    "headers" => $config["headers"] ? json_decode($config["headers"]) : json_decode("{}"),
                    "body" => $config["body"] ?? ""
                ]),
                "ip" => $request->ip(),
                "userAgent" => $request->userAgent()
            ]);
            return [
                "success" => true,
                "message" => "Config imported successfully!"
            ];
        }
    }


}
