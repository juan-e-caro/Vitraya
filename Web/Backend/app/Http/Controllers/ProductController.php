<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    // List all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Create a new product
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'string|nullable',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category' => 'string|nullable',
            'image_url' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        // Assign the vendor automatically from auth
        $data['vendor_id'] = $request->user()->id;

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    // Show a specific product
    public function show(string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    // Update a product
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Optional: Only vendor who owns it or admin can update
        if ($request->user()->role !== 'admin' && $request->user()->id !== $product->vendor_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'description' => 'string|nullable',
            'price' => 'numeric',
            'stock' => 'integer',
            'category' => 'string|nullable',
            'image_url' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $product->update($validator->validated());
        return response()->json($product);
    }

    // Delete a product
    public function destroy(Request $request, string $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Only vendor who owns it or admin can delete
        if ($request->user()->role !== 'admin' && $request->user()->id !== $product->vendor_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
