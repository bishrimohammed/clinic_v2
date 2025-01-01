"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { clinicProfileResType, FormclinicProfileSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { getStaticAddressesFn, LocationType } from "@/lib/api/global";
import { useQuery } from "@tanstack/react-query";

import { Switch } from "@/components/ui/switch";
import { hasPermission } from "@/lib/hasPermission";
const EditClinicProfileForm = ({
  clinic,
}: {
  clinic: clinicProfileResType;
  // locations?: LocationType;
}) => {
  const [canEditClinic, setCanEditClinic] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["static-addresses"],
    queryFn: getStaticAddressesFn,
    staleTime: 60 * 60 * 1000,
  });

  const form = useForm<z.infer<typeof FormclinicProfileSchema>>({
    resolver: zodResolver(FormclinicProfileSchema),
    defaultValues: {
      id: clinic.id,
      name: clinic.name,
      clinic_type: clinic.clinic_type,
      website_url: clinic.website_url,
      brand_color: clinic.brand_color,
      has_triage: clinic.has_triage,
      motto: clinic.motto,
      card_valid_date: clinic.card_valid_date,
      number_of_branch: clinic.number_of_branch,
      branch_addresses: "",
      address: {
        id: clinic.address_id,
        region_id: clinic.address.woreda.subcity.city.region.id.toString(),
        city_id: clinic.address.woreda.subcity.city.id.toString(),
        subcity_id: clinic.address.woreda.subcity.id.toString(),
        woreda_id: clinic.address.woreda_id.toString(),
        phone_1: clinic.address.phone_1,
      },
      working_hours: clinic.working_hours,
    },
  });
  // console.log(form.formState.errors);
  // const id:string = (<string>(locations.regions[0].id))
  const submitHandler = (values: z.infer<typeof FormclinicProfileSchema>) => {
    console.log(values);
  };
  const applyToAllHandler = () => {
    const { working_hours } = form.getValues();
    const mondayStartTime = working_hours.find(
      (working_hour) => working_hour.day_of_week === "Monday"
    )?.start_time!;
    const mondayEndTime = working_hours.find(
      (working_hour) => working_hour.day_of_week === "Monday"
    )?.end_time!;
    // console.log(working_hours);
    working_hours.forEach((work_hour, index) => {
      if (index !== 0) {
        form.setValue(`working_hours.${index}.start_time`, mondayStartTime);
        form.setValue(`working_hours.${index}.end_time`, mondayEndTime);
      }
    });
  };

  return (
    <div className="mt-6">
      <div className="border-b pb-2 mb-3 flex justify-between items-center">
        <h6 className="font-bold">Basic Information</h6>
        <Button
          onClick={() => {
            setCanEditClinic(true);
          }}
          disabled={!hasPermission("Clinic Profile", "edit")}
          size={"sm"}
        >
          Edit
        </Button>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submitHandler)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={!canEditClinic} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Logo */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      // accept="image/png, image/jpeg"
                      disabled={!canEditClinic}
                      // {...field}
                      onChange={(event) => {
                        field.onChange(event.target?.files);
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      accept="image/jpeg, image/png, image/gif, image/webp"
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clinic_seal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Seal</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      disabled={!canEditClinic}
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage>{errors.logo?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            {/* Clinic Type */}
            <FormField
              control={form.control}
              name="clinic_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Type</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={!canEditClinic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select clinic type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Eye">Eye</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="MCH">MCH</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage>{errors.clinicType?.message}</FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={!canEditClinic}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="brand_color"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Brand Color</FormLabel>
                    <FormControl>
                      <Input
                        type="color"
                        className="px-2 py-0.5 "
                        autoComplete="off"
                        disabled={!canEditClinic}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="has_triage"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col gap-2">
                    <FormLabel>has Traige</FormLabel>
                    <FormControl>
                      <Checkbox
                        disabled={!canEditClinic}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="motto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motto</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={!canEditClinic}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="card_valid_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Valid Days</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={!canEditClinic}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number_of_branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of branch</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={!canEditClinic}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* More fields like Website, Brand Color, Has Triage, etc. */}
            {/* Add similar patterns for all the remaining fields */}
          </div>
          <h6 className="border-b pb-2 text-lg font-bold ">
            Address Information
          </h6>
          {/* <Separator /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="address.phone_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      disabled={!canEditClinic}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      disabled={!canEditClinic}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.region_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={!canEditClinic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.regions?.map((region) => (
                        <SelectItem
                          key={region.name}
                          value={region.id.toString()}
                        >
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={!canEditClinic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.cities?.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.subcity_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SubCity</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={!canEditClinic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subcity" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.subcities?.map((subcity) => (
                        <SelectItem
                          key={subcity.id}
                          value={subcity.id.toString()}
                        >
                          {subcity.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.woreda_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Woreda</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={!canEditClinic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select woreda" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.woredas?.map((woreda) => (
                        <SelectItem
                          key={woreda.id}
                          value={woreda.id.toString()}
                        >
                          {woreda.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={!canEditClinic}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.house_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Numer</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={!canEditClinic}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h6 className="border-b pb-2 text-lg font-bold ">Working Hours</h6>
          {/* <Separator /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinic.working_hours.map((work_hour, index) => (
              <div key={work_hour.day_of_week}>
                <div className="flex items-center gap-3">
                  <h3 className="mb-1 font-semibold">
                    {work_hour.day_of_week}
                  </h3>
                  {work_hour.day_of_week === "Monday" && (
                    // <Button size={"sm"} asChild onClick={applyToAllHandler}>
                    <div
                      className="flex items-center gap-2"
                      onClick={applyToAllHandler}
                    >
                      <Switch disabled={!canEditClinic} />
                      Apply
                    </div>
                    // </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {/* <FormField
                    control={form.control}
                    name={`working_hours.${index}.start_time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            hidden
                            type="time"
                            disabled={!canEditClinic}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                  <input
                    type="text"
                    hidden
                    name={`working_hours.${index}.day_of_week`}
                    // {...register(`clinc_working_hours[${index}].id`)}
                    value={work_hour.day_of_week}
                    readOnly
                  />
                  <input
                    type="text"
                    hidden
                    name={`working_hours.${index}.id`}
                    // {...register(`clinc_working_hours[${index}].id`)}
                    value={work_hour.id}
                    readOnly
                  />
                  <FormField
                    control={form.control}
                    name={`working_hours.${index}.start_time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            disabled={!canEditClinic}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            form?.formState?.errors?.working_hours?.[index]
                              ?.start_time?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`working_hours.${index}.end_time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            disabled={!canEditClinic}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage>
                          {
                            form?.formState?.errors?.working_hours?.[index]
                              ?.end_time?.message
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* {!!canEditClinic && ( */}
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              // disabled={isPending}
            >
              {/* {isPending && <Spinner size="sm" />} */}
              Update
            </Button>
          </div>
          {/* )} */}
        </form>
      </Form>
    </div>
  );
};

export default EditClinicProfileForm;
