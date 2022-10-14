Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
        <section class="item_sec">
            <div class="container">
            <h3 class="item_heading">Fetured Items</h3>
             <p class="sec_desc">Shop for items based on what we featured in this week</p>
             <div class="item_flex">
             <item v-for="product of filtered" :key="product.id_product" :product="product"></item>

             </div>
             <div class="item_button">
                    <a class="button" href="Catalog.html">
                        Browse All Product
                    </a>
                </div>  
            </div>    
                </section>
             `
});
Vue.component('item', {
    props: ['product'],
    template: `
            <div class="item" >
            <a class="item_link" href="Product.html">
                <img class="item_pic":src="product.imgProduct" alt="product-image">
                <div class="txt_box">
                    <p class="item_desc">{{ product.product_name }}</p>
                    <p class="item_detal">{{ product.item_detal }}</p>
                    <p class="item_price">$ {{ product.price }}</p>
                </div>
            </a>
            <div class="add_box">
                <button class="add"  @click="$root.$refs.cart.addProduct(product)">
                    <img src="img/add_cart.svg" alt="cart">
                    <p class="add_txt">Add to Cart</p>
                </button>
            </div>
        </div>
    `
})