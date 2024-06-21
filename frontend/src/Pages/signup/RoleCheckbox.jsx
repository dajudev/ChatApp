import { Controller} from "react-hook-form";

const RoleCheckbox = ({control,errors}) => {
  return (
    <div className="flex flex-col">
        <div className="flex mt-2">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                    <span className="label-text text-white">Admin</span>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue=""
                        render={({field:{onChange,value}})=>(
                            <input 
                            checked={value === 'Admin'}
                            onChange={()=>onChange('Admin')}
                            type="checkbox" 
                            className="checkbox border-slate-900" 
                            />
                        )}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                    <span className="label-text text-white">Player</span>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue=""
                        render = {({field:{onChange,value}})=>(
                            <input 
                            checked={value === 'Player'}
                            onChange={()=>onChange('Player')}
                            type="checkbox" 
                            className="checkbox border-slate-900" 
                            />
                        )}
                    />
                </label>
            </div>
        </div>
        {errors.role?.message && (
            <div className="text-red-600"> {errors.role.message} </div>
        )}
    </div>
  )
}

export default RoleCheckbox