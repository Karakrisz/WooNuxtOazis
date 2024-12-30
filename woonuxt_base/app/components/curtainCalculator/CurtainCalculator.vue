<script setup lang="ts">
interface MetaData {
    key: string;
    value: string;
}

interface ProductCategory {
    slug: string;
    name: string;
}

interface Product {
    regularPrice: string;
    salePrice: string;
    metaData: MetaData[];
    productCategories?: {
        nodes: ProductCategory[];
    };
}

interface CurtainCalculatorProps {
    product: Product;
}

const props = defineProps<CurtainCalculatorProps>();
const emit = defineEmits<{
    (e: 'updatePrice', price: number): void;
    (e: 'updateOptions', options: any): void;
}>();

const sewingType = ref('');
const width = ref('');
const length = ref('');
const basePrice = ref(0);

const isCurtainType = computed(() => {
    return props.product?.productCategories?.nodes?.some(
        (cat) => cat.slug === 'vitrazs' || cat.slug === 'keruleti'
    );
});

const isVitrazs = computed(() => {
    return props.product?.productCategories?.nodes?.some(
        (cat) => cat.slug === 'vitrazs'
    );
});

const minWidth = computed(() => {
    const minWidthMeta = props.product?.metaData?.find(
        (meta) => meta.key === '_curtain_min_width'
    );
    return parseFloat(minWidthMeta?.value || '0');
});

const maxLength = computed(() => {
    const hosszMeta = props.product?.metaData?.find(
        (meta) => meta.key === 'hossz'
    );
    return parseFloat(hosszMeta?.value || '290');
});

const sewingPricePerMeter = computed(() => {
    const sewingPriceMeta = props.product?.metaData?.find(
        (meta) => meta.key === '_curtain_sewing_price'
    );
    return parseFloat(sewingPriceMeta?.value || '2');
});

watch(sewingType, (newType) => {
    if (newType === 'Méteráru') {
        length.value = maxLength.value.toString();
    } else {
        length.value = '';
    }
});

const calculateSewingPrice = () => {
    if (!width.value || !length.value) return 0;

    const widthInMeters = parseFloat(width.value) / 100;
    const lengthInMeters = parseFloat(length.value) / 100;

    if (isVitrazs.value) {
        return sewingPricePerMeter.value * (2 * widthInMeters);
    } else {
        return sewingPricePerMeter.value * (2 * (widthInMeters + lengthInMeters));
    }
};

const calculateBasePrice = () => {
    if (!width.value) return 0;
    const pricePerMeter = parseFloat(props.product?.regularPrice || '0');
    return (parseFloat(width.value) / 100) * pricePerMeter;
};

const calculateTotalPrice = () => {
    if (!width.value || !length.value) return 0;

    const basePrice = calculateBasePrice();

    if (sewingType.value === 'Készre varrás') {
        return basePrice + calculateSewingPrice();
    }

    return basePrice;
};

watch([width, length, sewingType], () => {
    const totalPrice = calculateTotalPrice();
    const sewingPrice = sewingType.value === 'Készre varrás' ? calculateSewingPrice() : 0;

    emit('updatePrice', totalPrice);
    emit('updateOptions', {
        width: width.value,
        length: length.value,
        sewingType: sewingType.value,
        fabricPrice: calculateBasePrice(),
        sewingPrice
    });
});

onMounted(() => {
    basePrice.value = parseFloat(props.product?.regularPrice || '0');
});
</script>

<template>
    <div v-if="isCurtainType" class="space-y-4">
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
            <div>
                <span class="text-gray-600">Egységár:</span>
                <span class="ml-2 font-semibold">{{ basePrice.toLocaleString() }} Ft / méter</span>
            </div>
            <div>
                <span class="text-gray-600">Varrási díj:</span>
                <span class="ml-2 font-semibold">{{ sewingPricePerMeter }} Ft / méter</span>
            </div>
        </div>

        <div class="p-4 border rounded-lg space-y-4">
            <div class="flex gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="sewingType" type="radio" value="Készre varrás" class="w-4 h-4 text-primary focus:ring-primary border-gray-300">
                    <span class="text-sm">Készre varrás</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="sewingType" type="radio" value="Méteráru" class="w-4 h-4 text-primary focus:ring-primary border-gray-300">
                    <span class="text-sm">Méteráru</span>
                </label>
            </div>

            <div v-if="sewingType" class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium mb-1 block">Szélesség (cm)</label>
                    <input v-model="width" type="number" :min="minWidth" class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" :placeholder="`Min ${minWidth} cm`">
                    <p v-if="width && parseFloat(width) < minWidth" class="text-xs text-red-500 mt-1">
                        Min. {{ minWidth }} cm
                    </p>
                </div>

                <div>
                    <label class="text-sm font-medium mb-1 block">Hosszúság (cm)</label>
                    <input v-model="length" type="number" :max="maxLength" :readonly="sewingType === 'Méteráru'" :class="[
                        'w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm',
                        sewingType === 'Méteráru' ? 'bg-gray-100' : ''
                    ]" :placeholder="sewingType === 'Méteráru' ? '' : `Max ${maxLength} cm`">
                    <p v-if="length && parseFloat(length) > maxLength" class="text-xs text-red-500 mt-1">
                        Max. {{ maxLength }} cm
                    </p>
                </div>
            </div>
        </div>

        <div v-if="sewingType && width && length" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div class="text-sm">
                <div v-if="sewingType === 'Készre varrás'" class="flex gap-4">
                    <span class="text-gray-600">Anyag: {{ calculateBasePrice().toLocaleString() }} Ft</span>
                    <span class="text-gray-600">
                        + Varrás: {{ calculateSewingPrice().toLocaleString() }} Ft
                    </span>
                </div>
            </div>
            <div class="text-lg font-bold text-primary">
                {{ calculateTotalPrice().toLocaleString() }} Ft
            </div>
        </div>
    </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button {
    opacity: 1;
}
</style>