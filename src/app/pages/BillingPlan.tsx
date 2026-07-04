import { useState } from "react";
import { CreditCard, Download, Users } from "lucide-react";
import { plan, usage, invoices } from "../lib/data";

export function BillingPlan() {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly");
  const price = cycle === "monthly" ? plan.priceMonthly : plan.priceAnnual;

  const spendPct = Math.round((usage.adSpendManaged / usage.adSpendLimit) * 100);
  const apiPct = Math.round((usage.apiCalls / usage.apiCallsLimit) * 100);
  const seatPct = Math.round((plan.seatsUsed / plan.seatsTotal) * 100);

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Billing &amp; Plan</h1>
          <p className="text-xs text-gray-500 mt-0.5">Next invoice on {plan.nextInvoice}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Plan card */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Current Plan</div>
              <div className="text-xl font-bold text-gray-900 mt-1">{plan.name}</div>
            </div>
            <div className="p-2 rounded-lg bg-blue-50">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">${price.toLocaleString()}</span>
            <span className="text-xs text-gray-400">/ {cycle === "monthly" ? "month" : "year"}</span>
          </div>

          <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-0.5 w-fit">
            {(["monthly", "annual"] as const).map(c => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md capitalize transition-colors ${
                  cycle === c
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {c} {c === "annual" && <span className="text-emerald-600">· save 20%</span>}
              </button>
            ))}
          </div>

          <button className="w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30">
            Upgrade Plan
          </button>

          <div className="pt-3 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {plan.seatsUsed} of {plan.seatsTotal} seats used
          </div>
        </div>

        {/* Usage */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200/80 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Usage This Cycle</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-gray-600">Ad Spend Managed</span>
                <span className="text-xs text-gray-400">${usage.adSpendManaged.toLocaleString()} / ${usage.adSpendLimit.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${spendPct > 90 ? "bg-red-500" : "bg-blue-500"}`} style={{ width: `${spendPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-gray-600">API Calls</span>
                <span className="text-xs text-gray-400">{usage.apiCalls.toLocaleString()} / {usage.apiCallsLimit.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${apiPct > 90 ? "bg-red-500" : "bg-emerald-500"}`} style={{ width: `${apiPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-gray-600">Seats</span>
                <span className="text-xs text-gray-400">{plan.seatsUsed} / {plan.seatsTotal}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-purple-500" style={{ width: `${seatPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Invoice History</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {invoices.map(inv => (
            <div key={inv.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/60 transition-colors">
              <div>
                <div className="text-sm font-medium text-gray-900">{inv.date}</div>
                <div className="text-xs text-gray-400 mt-0.5">{plan.name} Plan</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-900">{inv.amount}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{inv.status}</span>
                <button className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
