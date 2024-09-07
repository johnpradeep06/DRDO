import { 
  FormControl,  
  // FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// import { Button } from "@/components/ui/button"
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input"
import { RegistrationFormType } from '@/types/registration';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { castes, genders, validIDTypes } from "@/constants/registration";
import { capitalize } from "lodash"

export const Profile = ()=>{
  const { control } = useFormContext<RegistrationFormType>();

  return (
    
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Profile Details
        </CardTitle>
        <CardDescription>
          Fill in your profile details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
          <FormField 
            control={control}
            name="profile.fullName"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your full name"
                    className="dark:bg-neutral-900"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={control}
            name="profile.dob"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Date of birth
                </FormLabel>
                <FormControl>
                <Input type="date" placeholder="Your date of birth" 
                  className="dark:bg-neutral-900"
                  onChange={field.onChange}
                  defaultValue={field.value} 
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={control}
            name="profile.presentAge"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Present Age
                </FormLabel>
                <FormControl>
                <Input type="number" placeholder="Your present age" 
                  className="dark:bg-neutral-900"
                  onChange={field.onChange}
                  defaultValue={field.value} 
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={control}
            name="profile.gender"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Gender
                </FormLabel>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-2"
                    >
                    {genders.map((gender, index)=>(
                      <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                        <FormControl><RadioGroupItem value={gender} /></FormControl>
                        <FormLabel>{capitalize(gender)}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={control}
            name="profile.emailAddress"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email address"
                    className="dark:bg-neutral-900"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField 
            control={control}
            name="profile.mobileNumber"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Mobile Number 
                </FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Your mobile number"
                    className="dark:bg-neutral-900"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={control}
            name="profile.caste"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Caste
                </FormLabel>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-2"
                    >
                    {castes.map((caste, index)=>(
                      <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                        <FormControl><RadioGroupItem value={caste} /></FormControl>
                        <FormLabel>{caste}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="lg:flex justify-between lg:space-x-2 max-lg:border max-lg:rounded-xl max-lg:p-2 max-lg:space-y-1 max-lg:shadow-sm">
            <FormField 
              control={control}
              name="profile.idProof.validIdType"
              render={({field})=>(
                <FormItem className="w-full lg:mr-1">
                  <FormLabel>
                    ID Proof 
                  </FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-neutral-900">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {validIDTypes.map((idType, index)=>(
                          <SelectItem value={idType} key={index}>{idType}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={control}
              name="profile.idProof.value"
              render={({field})=>(
                <FormItem className="w-full lg:ml-1">
                  <FormLabel>
                    Value 
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter value"
                      className="dark:bg-neutral-900"
                      onChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
      </CardContent>
    </Card>
  )
}