let DB = [
    {id: 1, title: "Notebook", price: 1000, image: "https://24hstore.vn/images/products/2019/10/16/resized/macbook-pro-2019_1571196237.jpg"},
    {id: 2, title: "Display", price: 200, image: "http://artinnet.net/uploads/products_pictures/medium_mac.jpg"},
    {id: 3, title: "Keyboard", price: 20, image: "https://cdn.dribbble.com/users/274145/screenshots/3055400/magic-keyboard-3_teaser.png"},
    {id: 4, title: "Mouse", price: 10, image: "https://cdn.dribbble.com/users/110911/screenshots/810794/magic-mouse_teaser.jpg"},
    {id: 5, title: "Phone", price: 25, image: "https://www.komplettbedrift.no/img/p/200/1138904.jpg"},
    {id: 6, title: "Router", price: 30, image: "https://content.spiceworksstatic.com/service.community%2Fp%2Fproduct_images%2F0000074148%2F5113cb5f%2Fattached_image%2F1907653_thumb.jpeg"},
    {id: 7, title: "USB-camera", price: 18, image: "https://cdn.softwareappfree.com/uploads/f4000/large-ioxwebcamx-for-mac.png"},
    {id: 8, title: "Gamepad", price: 24, image: "https://i.pinimg.com/200x150/cf/e3/82/cfe38234b61d4dc806a358ae6b2600bb.jpg"},
];

let Cart = {
    add: function(item) {
        let index = this.findById(item.id);

        if (index != -1) {
            this._items[index].count++;
        } else {
            item.count = 1;
            this._items.push(item);
        }

        this.redraw();
    },
    remove: function(id) {
        let index = this.findById(id);

        if (index != -1) {
            array.splice(index, 1);
            this.redraw();
        }
    },
    redraw: function() {
        console.dir(this._items);
    },
    findById: function(id) {
        for (let i = 0; i < this.size(); i++) {
            if (this._items[i].id == id) {
                return i;
            }
        }

        return -1;
    },
    isEmpty: function() {
        return this.size() == 0;
    },
    size: function() {
        return this._items.length;
    },

    _items: []
};

(function main() {
    let root = document.getElementsByTagName("main")[0];
    let wrapper;

    for (let i = 0; i < DB.length; i++) {
        let item = DB[i];

        if (i % 4 == 0) {
            wrapper = document.createElement("div");
            wrapper.className = "product-wrp";
            root.appendChild(wrapper);
        }

        let product = document.createElement("div");
        product.className = "product";

        let img = document.createElement("img");
        img.setAttribute("src", item.image);
        img.setAttribute("alt", item.title);
        let h4 = document.createElement("h4");
        h4.textContent = item.title;
        let span = document.createElement("span");
        span.textContent = item.price + ' $';
        let button = document.createElement("button");
        button.className = "buy";
        button.textContent = "Купить";
        button.setAttribute("data-id", item.id);

        button.onclick = function(event) {
            let id = event.target.getAttribute("data-id");
            
            for (let i = 0; i < DB.length; i++) {
                if (DB[i].id == id) {
                    Cart.add(DB[i]);
                    break;
                }
            }
        }

        product.appendChild(img);
        product.appendChild(h4);
        product.appendChild(span);
        product.appendChild(button);

        wrapper.appendChild(product);
    }
})();
