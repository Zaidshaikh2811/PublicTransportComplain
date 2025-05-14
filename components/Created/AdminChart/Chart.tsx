import { format } from "date-fns";
import React from "react";
import { Component } from "./ChartDisplay";
import { chartData } from "@/actions/admin";

// Define the structure of the status timestamps
interface StatusTimestamps {
    inProgressAt?: string;  // Date string or undefined if not present
    resolvedAt?: string;    // Date string or undefined if not present
}

// Define the structure of a complaint
interface Complaint {
    statusTimestamps: StatusTimestamps;
}

// Define the structure of the monthly counts
interface MonthlyStatusCount {
    month: string;   // Format: 'yyyy-MM'
    inProgress: number;
    resolved: number;
}

// Function to process complaints and return monthly status counts
const getMonthlyStatusCounts = (complaints: Complaint[]): MonthlyStatusCount[] => {
    const counts: Record<string, MonthlyStatusCount> = {}; // Use record to store counts keyed by month

    complaints.forEach((complaint) => {
        const { statusTimestamps } = complaint;

        if (statusTimestamps.inProgressAt) {
            const month = format(new Date(statusTimestamps.inProgressAt), "yyyy-MM");
            counts[month] = counts[month] || { month, inProgress: 0, resolved: 0 };
            counts[month].inProgress += 1;
        }

        if (statusTimestamps.resolvedAt) {
            const month = format(new Date(statusTimestamps.resolvedAt), "yyyy-MM");
            counts[month] = counts[month] || { month, inProgress: 0, resolved: 0 };
            counts[month].resolved += 1;
        }
    });

    // Convert counts to an array and sort by month
    return Object.values(counts).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
};

// Define the type for the chart props


const Chart = async () => {
    const response = await chartData();  // Assuming chartData() fetches the complaints

    if (!response.success || !response.data) {
        throw new Error("Failed to fetch complaints data");
    }

    const data: Complaint[] = response.data;

    const transformed = getMonthlyStatusCounts(data);  // Transform the complaint data into monthly counts

    return (
        <div>
            <Component chartData={transformed} />
        </div>
    );
};

export default Chart;
