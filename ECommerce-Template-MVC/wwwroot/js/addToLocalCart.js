﻿$(document).ready(function () {
    $(".addToCart").on("click", function (event) {
        event.preventDefault();
        var productId = $(this).data("productid");
        var count = $("input[name='Count']").val();
        console.log("antes del post");
        console.log(count);
        $.post('/Home/AddToCart', { productId: productId, count: count }, function (response) {
            if (response.addToLocalStorage) {
                var cart = JSON.parse(localStorage.getItem("cart") || "[]");
                var existingProduct = cart.find(p => p.ProductId === response.product.productId);
                if (existingProduct) {
                    existingProduct.Count += parseInt(response.product.count, 10);
                    console.log(response.product);

                } else {
                    // Aquí adaptamos la estructura del objeto producto
                    console.log(response.product);
                    var newProduct = {
                        ProductId: response.product.productId,
                        Count: response.product.count,
                        Price: response.product.price,
                        ProductName: response.product.productName  // Usamos el ProductName aquí
                    };
                    cart.push(newProduct);

                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Producto añadido al carritodsss!");
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error al agregar al carrito: ", textStatus, errorThrown);
        });
    });
});