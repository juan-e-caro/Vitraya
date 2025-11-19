<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    // List all items in the authenticated user's cart
    public function index(Request $request)
    {
        $cart = CartItem::where('user_id', $request->user()->id)->with('product')->get();
        return response()->json($cart);
    }

    // Add a product to the cart
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();
        $data['user_id'] = $request->user()->id;

        // Check if product is already in cart
        $cartItem = CartItem::where('user_id', $data['user_id'])
                            ->where('product_id', $data['product_id'])
                            ->first();

        if ($cartItem) {
            $cartItem->quantity += $data['quantity'];
            $cartItem->save();
        } else {
            $cartItem = CartItem::create($data);
        }

        return response()->json($cartItem, 201);
    }

    // Update quantity of a cart item
    public function update(Request $request, string $id)
    {
        $cartItem = CartItem::find($id);

        if (!$cartItem || $cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Cart item not found or unauthorized'], 404);
        }

        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cartItem->update($validator->validated());
        return response()->json($cartItem);
    }

    // Remove a product from the cart
    public function destroy(Request $request, string $id)
    {
        $cartItem = CartItem::find($id);

        if (!$cartItem || $cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Cart item not found or unauthorized'], 404);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Cart item removed successfully']);
    }
}
