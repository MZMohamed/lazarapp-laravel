<?php

namespace App\Http\Requests;

use App\Models\Group;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GroupStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: only allow admin
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        // TODO: add unique rule
        // , Rule::unique(Group::class)->ignore($this->user()->belongsToThisGroup())

        return [
            'name' => ['required', 'string', 'max:255', 'min:2'],
        ];
    }
}
