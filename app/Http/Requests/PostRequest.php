<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required',
            'qualification' => 'required|string',
            'category' => 'required|integer',
            'status' => 'required|integer',
            'service' => 'required|string',
            'score' => 'string',
            'target' => 'required|string|max:200',
            'start_date' => 'required|date',
            'description' => 'required|string|max:1000',
            'steps' => 'required|array',
            'steps.*.stepNumber' => 'required|integer',
            'steps.*.serviceName' => 'nullable|string',
            'steps.*.period' => 'nullable|string',
            'steps.*.description' => 'nullable|string',
        ];
    }
}
