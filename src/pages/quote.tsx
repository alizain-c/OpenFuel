import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

type QuoteFields = {
  gallonsRequested: number;
  deliveryAddress: string;
  deliveryDate: Date;
  suggestedPrice: number;
  totalAmountDue: number;
};

const Quote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFields>();
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const onSubmit: SubmitHandler<QuoteFields> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
        <div>
          <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
            Open Fuel
          </h1>
          <h2 className="text-center text-3xl font-medium text-neutral-300">
            Get a Quote
          </h2>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label
                htmlFor="gallonsRequested"
                className="block text-sm font-medium text-gray-100"
              >
                Gallons Requested
              </label>
              <div className="mt-1">
                <input
                  id="gallonsRequested"
                  type="number"
                  required
                  {...register("gallonsRequested", {
                    required: true,
                  })}
                  className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="deliveryAddress"
                className="block text-sm font-medium text-gray-100"
              >
                Delivery Address
              </label>
              <div className="mt-1">
                <input
                  id="deliveryAddress"
                  type="text"
                  {...register("deliveryAddress")}
                  className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="deliveryDate"
                className="block text-sm font-medium text-gray-100"
              >
                Delivery Date
              </label>
              <div className="mt-1">
                <DatePicker
                  selected={deliveryDate}
                  onChange={(date) => setDeliveryDate(date as Date)}
                  className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="suggestedPrice"
                className="block text-sm font-medium text-gray-100"
              >
                Suggested Price/Gallon
              </label>
              <div className="mt-1">
                <input
                  id="suggestedPrice"
                  type="number"
                  readOnly
                  value="0.00"
                  {...register("suggestedPrice", {
                    required: true,
                  })}
                  className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="totalAmountDue"
                className="block text-sm font-medium text-gray-100"
              >
                Total Amount Due
              </label>
              <div className="mt-1">
                <input
                  id="totalAmountDue"
                  type="number"
                  required
                  readOnly
                  value="0.00"
                  {...register("totalAmountDue", {
                    required: true,
                  })}
                  className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-neutral-900 shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Get Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Quote;
