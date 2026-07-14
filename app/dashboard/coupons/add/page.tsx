export default function AddCouponPage(){
    const handleAddCoupon =async(prevState:unknown,formData:FormData)=>{
        const state =await addCoupon(prevState,formData)
        if(state.type==="success"){
            toast.success(state.message)
        }
        if(state.type==="error"){
            toast.error(state.message)
         }
         
         return state
    }
    
    
    const [state,formAction,isPending]=useActionState(handleAddCoupon, null)
    
    
    return <form action={formAction}>
        <Input name="code" errors={state?.errors?.code} label="Code"/>
        <Select name="discountType" options={[{key:"Select Discount Type", value:""},...Object.entries(DiscountType).map(([key,value])=>({label:key,value}))]}
         errors={state?.errors?.discountType}/>
            />
        <Input type="number" name="discountValuePennies" errors={state?.errors?.code} label="Code"/>
        <Input type="datetime" name="expiresAt"
         errors={state?.errors?.expiresAt}/>
         <Switch label="Is Coupon Active?" />
        <Input name="maxUses" type="number" label="Max Uses" errors={state?.errors?.code}/>

        <Button type="submit" isLoading={isPending}>{isPending?"Adding...":"Add Coupon"}</Button>

    </form>
}