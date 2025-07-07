<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use OpenAI;

class AIController extends Controller
{
    public function recommend(Request $request)
    {
        $query = $request->input('query');
        $books = Product::select('id', 'name', 'short_description', 'discounted_price')->get();
        $bookJson = $books->toJson();

        $openAiResponse = OpenAI::client(env('OPENAI_API_KEY'))->chat()->create([
            'model' => 'gpt-4o',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => "You are a helpful assistant. Recommend books ONLY from this list. Format output as JSON array of matching books.",
                ],
                [
                    'role' => 'user',
                    'content' => "User needs: {$query}. Available books: {$bookJson}",
                ],
            ],
        ]);

        $content = $openAiResponse->choices[0]->message->content;
        $jsonStart = strpos($content, '[');
        $json = substr($content, $jsonStart);
        $recommendations = json_decode($json, true);

        // Return back with props for Inertia
        return back()->with(['recommendations' => $recommendations]);
    }
}
